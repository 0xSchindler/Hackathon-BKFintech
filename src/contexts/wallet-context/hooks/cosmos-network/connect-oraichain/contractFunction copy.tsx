import { TAddressContract } from 'src/constants/contract-address/types';
import { encodeToBase64 } from 'src/utils';
import { TDenomNative } from '../../../types';

export type TCrosschainId = 'cosmoshub-4' | 'osmosis-1';
export type TKeyContractToken = keyof Pick<TAddressContract, 'SC_ORAI_TOKEN' | 'S_ORAI_TOKEN' | 'SC_ATOM_TOKEN' | 'ST_ATOM_TOKEN' | 'ST_OSMO_TOKEN' | 'USDT' | 'SC_OSMO_TOKEN'>;
export type TKeyContractCustody = keyof Pick<TAddressContract, 'S_ORAI_CUSTODY' | 'SC_ORAI_CUSTODY' | 'ST_ATOM_CUSTODY' | 'ST_OSMO_CUSTODY' | 'SC_ATOM_CUSTODY'>;
export type TKeyContractReward = keyof Pick<TAddressContract, 'SC_ATOM_CUSTODY_REWARD' | 'SC_ORAI_CUSTODY_REWARD' | 'S_ORAI_CUSTODY_REWARD' | 'ORAI_STAKING_REWARD' | 'CROSSCHAIN_STAKING_REWARD'>;
export type TKeyContractHub = keyof Pick<TAddressContract, 'ORAI_STAKING_HUB' | 'CROSSCHAIN_STAKING_HUB'>;

export const contractFunction = (contracts: TAddressContract) => {
    function tokenBalance(keyContractToken: TKeyContractToken, addressQuerryBalance: string) {
        // TODO: if no addressQuerryBalance, then use default user address to query
        return {
            address: contracts[keyContractToken],
            data: encodeToBase64({ balance: { address: addressQuerryBalance } }),
        };
    }

    function collateralBalance(keyContractCustody: TKeyContractCustody, addressQuerryBalance: string) {
        return {
            address: contracts[keyContractCustody],
            data: encodeToBase64({ borrower: { address: addressQuerryBalance } }),
        };
    }

    function accruedRewards(keyContractCustodyReward: TKeyContractReward, addressQuerryBalance: string) {
        return {
            address: contracts[keyContractCustodyReward],
            data: encodeToBase64({ accrued_rewards: { address: addressQuerryBalance } }),
        };
    }

    function config(keyContract: keyof Pick<TAddressContract, 'MARKET' | 'ORAI_STAKING_REWARD'>) {
        return {
            address: contracts[keyContract],
            data: encodeToBase64({ config: {} }),
        };
    }

    return {
        config,
        tokenBalance,
        collateralBalance,
        accruedRewards,
        USDT: {
            balance: (address: string) => {
                return {
                    address: contracts.USDT,
                    data: encodeToBase64({ balance: { address: address } }),
                };
            },
        },

        ORAI_STAKING_HUB: {
            state: {
                address: contracts.ORAI_STAKING_HUB,
                data: encodeToBase64({ state: {} }),
            },
            withdrawableUnbonded: (userAddress: string, typeToken: 's_orai' | 'sc_orai') => {
                return {
                    address: contracts.ORAI_STAKING_HUB,
                    data: encodeToBase64({ withdrawable_unbonded: { address: userAddress, unbond_type: typeToken } }),
                };
            },
            unreleasedRequests: (userAddress: string, typeToken: 's_orai' | 'sc_orai') => {
                return {
                    address: contracts.ORAI_STAKING_HUB,
                    data: encodeToBase64({ unreleased_requests: { address: userAddress, unbond_type: typeToken } }),
                };
            },
        },
        CROSSCHAIN_STAKING_HUB: {
            unreleasedRequests: (userAddress: string, chainId: TCrosschainId) => {
                return {
                    address: contracts.CROSSCHAIN_STAKING_HUB,
                    data: encodeToBase64({ unreleased_requests: { address: userAddress, chain_id: chainId } }),
                };
            },
            withdrawableUnbonded: (userAddress: string, chainId: TCrosschainId) => {
                return {
                    address: contracts.CROSSCHAIN_STAKING_HUB,
                    data: encodeToBase64({ withdrawable_unbonded: { address: userAddress, chain_id: chainId } }),
                };
            },
        },
        AUSDT: {
            balance: (addressQuerryBalance: string) => {
                return {
                    address: contracts.AUSDT,
                    data: encodeToBase64({ balance: { address: addressQuerryBalance } }),
                };
            },
        },
        MARKET: {
            state: {
                address: contracts.MARKET,
                data: encodeToBase64({ state: {} }),
            },
            config: {
                address: contracts.MARKET,
                data: encodeToBase64({ config: {} }),
            },
            epochState: {
                address: contracts.MARKET,
                data: encodeToBase64({
                    epoch_state: {
                        distributed_interest: '0',
                    },
                }),
            },
            borrowerInfo: (userAddress: string) => {
                return {
                    address: contracts.MARKET,
                    data: encodeToBase64({ borrower_info: { borrower: userAddress } }),
                };
            },
        },
        INTEREST_MODEL: {
            borrowRate: (marketBalance: any, totalLiabilities: any, totalReserves: any) => {
                return {
                    address: contracts.INTEREST_MODEL,
                    data: encodeToBase64({ borrow_rate: { market_balance: marketBalance, total_liabilities: totalLiabilities, total_reserves: totalReserves } }),
                };
            },
        },
        OVERSEER: {
            borrowLimit: (userAddress: string) => {
                return {
                    address: contracts.OVERSEER,
                    data: encodeToBase64({ borrow_limit: { borrower: userAddress } }),
                };
            },
            collaterals: (userAddress: string) => {
                return {
                    address: contracts.OVERSEER,
                    data: encodeToBase64({ collaterals: { borrower: userAddress } }),
                };
            },
            whitelist: (collateralTokenKeyContract?: TKeyContractToken) => {
                // TODO: get LTV
                if (collateralTokenKeyContract) {
                    return {
                        address: contracts.OVERSEER,
                        data: encodeToBase64({ whitelist: { collateral_token: contracts[collateralTokenKeyContract] } }),
                    };
                }
                return {
                    address: contracts.OVERSEER,
                    data: encodeToBase64({ whitelist: {} }),
                };
            },
        },
        ORACLE: {
            nativeTokenPrice: (_denom: TDenomNative) => {
                return {
                    address: contracts.ORACLE,
                    data: encodeToBase64({
                        price: {
                            base: { token: { contract_addr: contracts.USDT } },
                            quote: { native_token: { denom: _denom } },
                        },
                    }),
                };
            },
            contractTokenPrice: (contractKey: TKeyContractToken) => {
                return {
                    address: contracts.ORACLE,
                    data: encodeToBase64({
                        price: {
                            base: { token: { contract_addr: contracts.USDT } },
                            quote: { token: { contract_addr: contracts[contractKey] } },
                        },
                    }),
                };
            },
        },
        SMART_WALLET_HUB: {
            querySmartWalletCodeId: {
                address: contracts.SMART_WALLET_HUB,
                data: encodeToBase64({
                    config: {},
                }),
            },
        },
    };
};

export type TContractOraichainFunction = ReturnType<typeof contractFunction>;
