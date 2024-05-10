import { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import BigNumber from 'bignumber.js';
import { TOraichainData } from './hooks/cosmos-network/connect-oraichain/useConnectOraichain';
import { WalletConnected, Chainconnected } from 'src/constants';
import { TAddressContract } from 'src/constants/contract-address/types';
import { TAssetTokenList } from './useAssetTokenList';
import { TDataModalSelectWallet } from 'src/components/ModalSelectConnectWallet/ModalSelectConnectWallet';

export type TCosmosWallet = WalletConnected.Keplr | WalletConnected.Owallet | WalletConnected.Leap | WalletConnected.NoWallet;

export interface IContextReturnData extends TAssetTokenList {
    ctrAddress: TAddressContract;
    oraichain: TOraichainData;
    isConnecting: boolean;
    chainConnected: Chainconnected;
    walletConnected: WalletConnected;
    disconnectWallet: () => void;
    revokeConnected: () => void;
    getUserAddressConnecting: () => string | null;
    getSmartWalletConnecting: () => {
        smartWallet: string;
        isDefault: boolean;
    };
    selectNetworkChange: (chainPendingConnect: Chainconnected) => Promise<void>;
    modal: TDataModalSelectWallet;
    openModalSelectWallet: (chain: Chainconnected, isChangeSelectNetwork?: boolean) => void;
    connectChainAndWallet: (chain: Chainconnected, wallet: WalletConnected) => Promise<StateConnectWallet>;
}

export enum StateConnectWallet {
    SUCCESS,
    FAIL,
    PENDING,
}

export type TInputQueryContract = {
    address: string;
    data: string;
};

export type TChain = 'EVM' | 'COSMOS';

export type TDenomNative = 'orai' | 'usdt';

export type AssetInfo = { native_token: { denom: string } } | { token: { contract_addr: string } };

