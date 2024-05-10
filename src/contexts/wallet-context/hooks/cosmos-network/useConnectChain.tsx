import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Decimal } from '@cosmjs/math';
import { ChainInfo, OfflineAminoSigner } from '@keplr-wallet/types';
import { useEffect, useLayoutEffect, useState } from 'react';
import useNotifier from 'src/hooks/useNotifier';
import { BN } from 'src/utils';
import BigNumber from 'bignumber.js';
import { encodeSecp256k1Pubkey } from '@cosmjs/amino';
import { Chainconnected, LocalStorageKey, WalletConnected } from 'src/constants';
import { getCosmosConnector } from '../../utils';
import { WalletExtensionError } from '../../WalletExtensionError';
import { IDataChainConnected, TCosmosWallet } from './type';

type Props = {
    chainInfo: ChainInfo;
};

export default function useConnectChain({ chainInfo }: Props) {
    const [isConnecting, setConnecting] = useState<boolean>(false);
    const { notifyError, notifyWarn, notifySuccess } = useNotifier();
    const [data, setData] = useState<IDataChainConnected>({ address: '', userClient: null, baseDivident: BN(1), client: null, pubKey: '' });
    const [error, setError] = useState<Error | undefined>();

    function translateValueToken(value: string | BigNumber, decimal?: number) {
        if (decimal) {
            return BN(value).div(BN(10).pow(decimal));
        }
        return BN(value).div(data.baseDivident);
    }
    async function connectPublicClient() {
        try {
            const _client = await SigningCosmWasmClient.connect(chainInfo.rpc);
            setData((prev) => {
                return {
                    ...prev,
                    client: _client,
                };
            });
        } catch (err) {
            console.log(err);
        }
    }
    async function connect(wallet?: TCosmosWallet) {
        setConnecting(true);
        setError(undefined);
        let checkConnectSuccess = false;
        try {
            const provider = await getCosmosConnector(wallet);
            // eslint-disable-next-line no-empty
            if (!provider) {
            } else {
                try {
                    await provider.enable(chainInfo.chainId);
                } catch (err) {
                    console.log((err as Error).message);
                    if ((err as Error).message == WalletExtensionError.Keplr_Rejected) {
                        throw Error('Request rejected');
                    } else if ((err as Error).message == WalletExtensionError.Owallet_Rejected) {
                        throw Error('Request rejected');
                    } else {
                        await provider.experimentalSuggestChain(chainInfo as any);
                    }
                }
                const offlineSigner = provider.getOfflineSignerOnlyAmino(chainInfo.chainId);
                const accounts = await offlineSigner.getAccounts();

                const coswasmStageGate = await SigningCosmWasmClient.connectWithSigner(chainInfo.rpc, offlineSigner as OfflineAminoSigner, {
                    gasPrice: { amount: Decimal.fromUserInput('0', 0), denom: chainInfo.currencies[0].coinDenom },
                });

                setData((prev) => {
                    return {
                        ...prev,
                        address: accounts[0].address,
                        pubKey: encodeSecp256k1Pubkey(accounts[0].pubkey).value,
                        userClient: coswasmStageGate,
                        baseDivident: BN(10).pow(chainInfo.stakeCurrency!.coinDecimals),
                    };
                });
                checkConnectSuccess = true;
            }
        } catch (err) {
            console.log(err as Error);
            notifyError((err as Error).message);
            setError(err as Error);
            setData((prev) => {
                return {
                    ...prev,
                    address: '',
                    pubKey: '',
                    userClient: null,
                    baseDivident: BN(1),
                };
            });
        }
        setConnecting(false);
        return checkConnectSuccess;
    }

    function setEventAfterWindowLoad(event: () => void) {
        if (localStorage.getItem(LocalStorageKey.ChainConnected) == Chainconnected.Oraichain) {
            const wallet = localStorage.getItem(LocalStorageKey.WalletConnected);
            if (wallet == WalletConnected.Keplr || wallet == WalletConnected.Owallet) {
                window.addEventListener('keplr_keystorechange', event);
            }
            if (wallet == WalletConnected.Leap) {
                window.addEventListener('leap_keystorechange', event);
            }
        }
    }
    function removeEventWindow(event: () => void) {
        if (localStorage.getItem(LocalStorageKey.ChainConnected) == Chainconnected.Oraichain) {
            const wallet = localStorage.getItem(LocalStorageKey.WalletConnected);
            if (wallet == WalletConnected.Keplr || wallet == WalletConnected.Owallet) {
                window.removeEventListener('keplr_keystorechange', event);
            }
            if (wallet == WalletConnected.Leap) {
                window.removeEventListener('leap_keystorechange', event);
            }
        }
    }
    function disconnectWallet() {
        setData((prev) => {
            return {
                ...prev,
                address: '',
                pubKey: '',
                userClient: null,
                baseDivident: BN(1),
                // client: null,
            };
        });
    }

    useLayoutEffect(() => {
        connectPublicClient();
    }, []);
    return {
        isConnecting,
        chainInfo,
        error,
        translateValueToken,
        connect,
        setEventAfterWindowLoad,
        removeEventWindow,
        connectPublicClient,
        disconnectWallet,
        ...data,
    };
}

export type TDataReturnConnectChain = ReturnType<typeof useConnectChain>;
