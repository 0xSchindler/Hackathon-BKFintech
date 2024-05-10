import { TAddressContract } from 'src/constants/contract-address/types';
import { TNet } from 'src/global.config';
import { AssetInfo } from './types';
import {
    IconAUSDT,
    IconAiri,
    IconAtom,
    IconINJ,
    IconKWT,
    IconMILKY,
    IconOrai,
    IconOraiX,
    IconOsmo,
    IconSCATOM,
    IconSCORAI,
    IconSCOSMO,
    IconSORAI,
    IconSTATOM,
    IconSTOSMO,
    IconScINJ,
    IconTron,
    IconUSDC,
    IconUSDT,
    SvgComponent,
} from 'src/assets/icon';

export enum IbcDenom {
    ATOM_MAINNET = 'ibc/A2E2EEC9057A4A1C2C0A6A4C78B0239118DF5F278830F50B4A6BDD7A66506B78',
    OSMO_MAINNET = 'ibc/9C4DCD21B48231D0BC2AC3D1B74A864746B37E4292694C93C617324250D002FC',
}

export type TAssetAppInfo = {
    nameToken: string;
    assetToken: AssetInfo;
    keyToken: string;
};

export type MapAssetInfo = Map<string, TAssetAppInfo>;

export default function useAssetTokenList(ctrAddress: TAddressContract, typeNet: TNet) {
    const atomOraichainDenom = typeNet == 'mainnet' ? IbcDenom.ATOM_MAINNET : IbcDenom.ATOM_MAINNET;
    const osmoOraichainDenom = typeNet == 'mainnet' ? IbcDenom.OSMO_MAINNET : IbcDenom.OSMO_MAINNET;

    const assetTokens = {
        ORAI: { native_token: { denom: 'orai' } },
        ATOM: { native_token: { denom: atomOraichainDenom } },
        OSMO: { native_token: { denom: osmoOraichainDenom } },
        AIRI: { token: { contract_addr: ctrAddress.AIRI } },
        ORAIX: { token: { contract_addr: ctrAddress.ORAIX } },
        USDT: { token: { contract_addr: ctrAddress.USDT } },
        aUSDT: { token: { contract_addr: ctrAddress.AUSDT } },
        sORAI: { token: { contract_addr: ctrAddress.S_ORAI_TOKEN } },
        scORAI: { token: { contract_addr: ctrAddress.SC_ORAI_TOKEN } },
        scATOM: { token: { contract_addr: ctrAddress.SC_ATOM_TOKEN } },
        stATOM: { token: { contract_addr: ctrAddress.ST_ATOM_TOKEN } },
        stOSMO: { token: { contract_addr: ctrAddress.ST_OSMO_TOKEN } },
        scOSMO: { token: { contract_addr: ctrAddress.SC_OSMO_TOKEN } },
        KWT: { token: { contract_addr: ctrAddress.KWT } },
        MILKY: { token: { contract_addr: ctrAddress.MILKY } },
        USDC: { token: { contract_addr: ctrAddress.USDC } },
        wTRX: { token: { contract_addr: ctrAddress.TRX } },
        INJ: { token: { contract_addr: ctrAddress.INJ_CW20 } },
        scINJ: { token: { contract_addr: ctrAddress.SC_INJ_TOKEN } },
    };

    const assetInfo: MapAssetInfo = new Map<string, TAssetAppInfo>([
        // TODO: map native token to Info
        ['orai', { nameToken: 'ORAI', assetToken: assetTokens.ORAI, keyToken: '' }],
        ['atom', { nameToken: 'ATOM', assetToken: assetTokens.ATOM, keyToken: '' }],
        ['osmo', { nameToken: 'OSMO', assetToken: assetTokens.OSMO, keyToken: '' }],

        // TODO: map contractAddress to token info
        [ctrAddress.S_ORAI_TOKEN, { nameToken: 'sORAI', assetToken: assetTokens.sORAI, keyToken: 'S_ORAI_TOKEN' }],
        [ctrAddress.SC_ORAI_TOKEN, { nameToken: 'scORAI', assetToken: assetTokens.scORAI, keyToken: 'SC_ORAI_TOKEN' }],
        [ctrAddress.SC_ATOM_TOKEN, { nameToken: 'scATOM', assetToken: assetTokens.scATOM, keyToken: 'SC_ATOM_TOKEN' }],
        [ctrAddress.ST_ATOM_TOKEN, { nameToken: 'stATOM', assetToken: assetTokens.stATOM, keyToken: 'ST_ATOM_TOKEN' }],
        [ctrAddress.ST_OSMO_TOKEN, { nameToken: 'stOSMO', assetToken: assetTokens.stOSMO, keyToken: 'ST_OSMO_TOKEN' }],
        [ctrAddress.SC_OSMO_TOKEN, { nameToken: 'scOSMO', assetToken: assetTokens.scOSMO, keyToken: 'SC_OSMO_TOKEN' }],
        [ctrAddress.AUSDT, { nameToken: 'aUSDT', assetToken: assetTokens.aUSDT, keyToken: 'AUSDT' }],
        [ctrAddress.USDT, { nameToken: 'USDT', assetToken: assetTokens.USDT, keyToken: 'USDT' }],
        [ctrAddress.ORAIX, { nameToken: 'ORAIX', assetToken: assetTokens.ORAIX, keyToken: 'ORAIX' }],
        [ctrAddress.AIRI, { nameToken: 'AIRI', assetToken: assetTokens.AIRI, keyToken: 'AIRI' }],
        [ctrAddress.KWT, { nameToken: 'KWT', assetToken: assetTokens.KWT, keyToken: 'KWT' }],
        [ctrAddress.MILKY, { nameToken: 'MILKY', assetToken: assetTokens.MILKY, keyToken: 'MILKY' }],
        [ctrAddress.USDC, { nameToken: 'USDC', assetToken: assetTokens.USDC, keyToken: 'USDC' }],
        [ctrAddress.TRX, { nameToken: 'wTRX', assetToken: assetTokens.wTRX, keyToken: 'TRX' }],
        [ctrAddress.INJ_CW20, { nameToken: 'INJ', assetToken: assetTokens.INJ, keyToken: 'INJ_CW20' }],
        [ctrAddress.SC_INJ_TOKEN, { nameToken: 'scINJ', assetToken: assetTokens.scINJ, keyToken: 'SC_INJ_TOKEN' }],
    ]);

    return {
        assetTokens,
        assetInfo,
    };
}

export type TAssetTokenList = ReturnType<typeof useAssetTokenList>;
export type TNameAssetToken = keyof TAssetTokenList['assetTokens'];

export const svgAssetToken: { [k in TNameAssetToken]: SvgComponent } = {
    ORAI: IconOrai,
    ORAIX: IconOraiX,
    sORAI: IconSORAI,
    scORAI: IconSCORAI,

    ATOM: IconAtom,
    stATOM: IconSTATOM,
    scATOM: IconSCATOM,

    OSMO: IconOsmo,
    stOSMO: IconSTOSMO,
    scOSMO: IconSCOSMO,

    USDT: IconUSDT,
    aUSDT: IconAUSDT,

    USDC: IconUSDC,
    AIRI: IconAiri,
    KWT: IconKWT,
    MILKY: IconMILKY,
    wTRX: IconTron,
    INJ: IconINJ,
    scINJ: IconScINJ,
};
