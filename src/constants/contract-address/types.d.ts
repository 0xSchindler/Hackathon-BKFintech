export type TAddressContract = {
    ORAI_STAKING_HUB: string;
    ORAI_STAKING_REWARD: string;

    CROSSCHAIN_STAKING_HUB: string;
    CROSSCHAIN_STAKING_REWARD: string;

    S_ORAI_TOKEN: string;
    S_ORAI_CUSTODY: string;
    S_ORAI_CUSTODY_REWARD: string;

    SC_ORAI_TOKEN: string;
    SC_ORAI_CUSTODY: string;
    SC_ORAI_CUSTODY_REWARD: string;

    USDT: string;
    AUSDT: string;

    ST_ATOM_TOKEN: string;
    ST_ATOM_CUSTODY: string;

    ST_OSMO_TOKEN: string;
    ST_OSMO_CUSTODY: string;

    SC_ATOM_TOKEN: string;
    SC_ATOM_CUSTODY: string;
    SC_ATOM_CUSTODY_REWARD: string;

    SC_OSMO_TOKEN: string;

    SMART_WALLET_HUB: string;
    MULTICALL: string;
    MARKET: string;
    INTEREST_MODEL: string;
    OVERSEER: string;
    ORACLE: string;

    ORAIX: string;
    USDC: string;
    KWT: string;
    MILKY: string;
    AIRI: string;
    TRX: string;
    INJ_CW20: string;
    SC_INJ_TOKEN: string;

    BOND: string;
};

export type TKeyAddressCtr = keyof TAddressContract;
