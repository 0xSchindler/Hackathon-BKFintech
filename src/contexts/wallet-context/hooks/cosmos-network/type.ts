import { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import BigNumber from 'bignumber.js';
import { WalletConnected } from 'src/constants';

export type TCosmosWallet = WalletConnected.Keplr | WalletConnected.Owallet | WalletConnected.Leap | WalletConnected.NoWallet;

export interface IDataChainConnected {
    address: string;
    userClient: SigningCosmWasmClient | null;
    baseDivident: BigNumber;
    client: CosmWasmClient | null;
    pubKey: string;
}
