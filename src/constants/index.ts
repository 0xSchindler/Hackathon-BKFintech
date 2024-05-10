import { IconOrai, IconUSDT, SvgComponent } from "src/assets/icon";

export enum WalletConnected {
    'Keplr' = 'Keplr',
    'Owallet' = 'Owallet',
    'Leap' = 'Leap',
    'NoWallet' = 'NoWalletConnected',
}

export type TAppDenom = "USDT" | "ORAI"

export type TTokenInfo = {
    contractAddess: string;
    icon: SvgComponent;
    decimal: number;
}

export const tokenInfo: { [k in TAppDenom]: TTokenInfo } = {
    ORAI: {
        contractAddess: "",
        decimal: 6,
        icon: IconOrai
    },
    USDT: {
        contractAddess: "",
        decimal: 6,
        icon: IconUSDT
    }
}

export const DEFAULT_SMART_CONTRACT = 'orai12hzjxfh77wl572gdzct2fxv2arxcwh6gykc7qh';

export const LEVERAGE_MGE_BACKEND_URL = 'https://api.orchai.io/strategy';

export enum StrategyName {
    'Omm_Leverage_Management_Boost' = 'Omm_Leverage_Management_Boost',
    'Omm_Leverage_Management_Repay' = 'Omm_Leverage_Management_Repay',
}

export enum LocalStorageKey {
    IsConnected = 'isConnected',
    TypeNetwork = 'typeNetwork',
    ChainConnected = 'chainConnected',
    WalletConnected = 'walletConnected',
}

export enum Chainconnected {
    'Oraichain' = 'Oraichain',
    'NoConnected' = 'NoConnected',
}

export enum AppRouterUrl {
    combinator = '/ai/combinator',
    combinator_create_recipe = '/ai/combinator/create-recipe',

    dapp_omm = '/dapps/orchai-money-market',
    dapp_omm_automation = '/dapps/orchai-money-market/automation',
}



