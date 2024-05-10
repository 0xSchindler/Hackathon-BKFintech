import useConnectChain from '../useConnectChain';
import { TInputQueryContract } from '../../../types';
import { BN, decodeBase64 } from 'src/utils';
import { TNet } from 'src/global.config';
import { chainInfo } from 'src/constants/chain-info';
import { blockPerYear as bpy, scanTransaction } from './constants';
import { contractFunction } from './contractFunction';
import { ContractAddress } from 'src/constants/contract-address/ContractAddress';
// import { exeFunctions } from './exeFunction';
import { ChainId } from 'orchai-recipe-sdk/src/types';
import { useEffect, useState } from 'react';
import { DEFAULT_SMART_CONTRACT } from 'src/constants';

export default function useConnectOraichain(typeNet: TNet) {
    const connectData = useConnectChain({ chainInfo: chainInfo.oraichain });
    const ctrAddress = ContractAddress;
    const blockPerYear = bpy[typeNet];
    const baseUrlTxs = scanTransaction;

    const [smartWallet, setSmartWallet] = useState<string>(DEFAULT_SMART_CONTRACT);
    const isDefaultSmartContract = smartWallet == DEFAULT_SMART_CONTRACT;

    const ctrFunction = contractFunction(ctrAddress);
    // const execute = exeFunctions(chainInfo.oraichain.chainId as ChainId, ctrAddress, connectData.userClient, connectData.baseDivident, connectData.address);

    async function query(queryFunction: TInputQueryContract): Promise<{ data: any; success: boolean }> {
        if (connectData.client) {
            try {
                const res = await connectData.client.queryContractSmart(queryFunction.address, {
                    ...decodeBase64(queryFunction.data),
                });

                return {
                    success: true,
                    data: res,
                };
            } catch (err) {
                console.log(queryFunction, err);
                return {
                    data: { mess: (err as Error).message },
                    success: false,
                };
            }
        }
        return {
            data: { mess: 'Client is not ready!' },
            success: false,
        };
    }
    async function userQuery(queryFunction: TInputQueryContract): Promise<{ data: any; success: boolean }> {
        if (connectData.userClient) {
            try {
                const res = await connectData.userClient.queryContractSmart(queryFunction.address, {
                    ...decodeBase64(queryFunction.data),
                });

                return {
                    success: true,
                    data: res,
                };
            } catch (err) {
                console.log(err);
                return {
                    data: { mess: (err as Error).message },
                    success: false,
                };
            }
        }
        return {
            data: { mess: 'You have not connect your wallet yet!' },
            success: false,
        };
    }
    async function queryMulti(queryList: TInputQueryContract[]): Promise<{ data: any; success: boolean }[]> {
        if (connectData.client) {
            try {
                const res = await connectData.client.queryContractSmart(ctrAddress.MULTICALL, {
                    aggregate: {
                        queries: queryList,
                    },
                });
                return res.return_data.map((response: { data: string; success: boolean }) => {
                    return {
                        data: decodeBase64(response.data),
                        success: response.success,
                    };
                });
            } catch (err) {
                console.log(err);
            }
        }
        return [];
    }

    async function userQueryMulti(queryList: TInputQueryContract[]): Promise<{ data: any; success: boolean }[]> {
        if (connectData.userClient) {
            try {
                const res = await connectData.userClient.queryContractSmart(ctrAddress.MULTICALL, {
                    aggregate: {
                        queries: queryList,
                    },
                });
                return res.return_data.map((response: { data: string; success: boolean }) => {
                    return {
                        data: decodeBase64(response.data),
                        success: response.success,
                    };
                });
            } catch (err) {
                console.log(err);
            }
        }
        return [];
    }

    function toAPY(apr: string | number): string {
        const bigNumberApr = BN(apr);
        if (bigNumberApr.isGreaterThan(100)) {
            return bigNumberApr.toString();
        }
        if (bigNumberApr.isLessThan(0)) {
            const _n = BN(1).plus(bigNumberApr.abs().div(BN(blockPerYear).times(100))); // 513131700 = blockPerYear * 100 //  apr la dang %
            if (_n.isGreaterThan(5000)) {
                return 'Infinity';
            }
            return (
                '-' +
                BN(Math.pow(_n.toNumber(), blockPerYear) - 1)
                    .times(100)
                    .toString()
            );
        } else {
            const _n = BN(1).plus(bigNumberApr.div(BN(blockPerYear).times(100))); // 513131700 = blockPerYear * 100 //  apr la dang %
            if (_n.isGreaterThan(5000)) {
                return 'Infinity';
            }
            return BN(Math.pow(_n.toNumber(), blockPerYear) - 1)
                .times(100)
                .toString();
        }
    }

    async function getSmartWallet() {
        if (connectData.userClient) {
            try {
                const response = await connectData.userClient.queryContractSmart(ctrAddress.SMART_WALLET_HUB, {
                    smart_wallet_by_user: { user: connectData.address },
                });
                if (response.length == 0) throw Error('Smart wallet has not been created yet!');
                // console.log(response);
                setSmartWallet(response[0]);
            } catch (err) {
                setSmartWallet(DEFAULT_SMART_CONTRACT);
                console.log(err);
            }
        }
    }
    function disconnectOraichain() {
        connectData.disconnectWallet();
        setSmartWallet(DEFAULT_SMART_CONTRACT);
    }

    useEffect(() => {
        getSmartWallet();
    }, [connectData.userClient]);

    return {
        ...connectData,
        blockPerYear,
        baseUrlTxs,
        queryMulti,
        userQueryMulti,
        query,
        userQuery,
        ctrFunction,
        toAPY,
        // execute,
        smartWallet,
        isDefaultSmartContract,
        getSmartWallet,
        disconnectOraichain,
    };
}

export type TOraichainData = ReturnType<typeof useConnectOraichain>;
