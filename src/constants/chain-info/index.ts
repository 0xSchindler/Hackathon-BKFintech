import { ChainInfo } from '@keplr-wallet/types';

export type TChainConnect = 'oraichain';

export const chainInfo: { [key in TChainConnect]: ChainInfo } = {
    oraichain: {
        chainId: 'Oraichain',
        chainName: 'Oraichain',
        rpc: 'https://rpc.orai.io',
        rest: 'https://lcd.orai.io',
        bech32Config: {
            bech32PrefixAccAddr: 'orai',
            bech32PrefixAccPub: 'orai' + 'pub',
            bech32PrefixValAddr: 'orai' + 'valoper',
            bech32PrefixValPub: 'orai' + 'valoperpub',
            bech32PrefixConsAddr: 'orai' + 'valcons',
            bech32PrefixConsPub: 'orai' + 'valconspub',
        },

        stakeCurrency: {
            coinDenom: 'ORAI',
            coinMinimalDenom: 'orai',
            coinDecimals: 6,
            coinGeckoId: 'oraichain-token',
        },
        bip44: {
            coinType: 118,
        },

        feeCurrencies: [
            {
                coinDenom: 'ORAI',
                coinMinimalDenom: 'orai',
                coinDecimals: 6,
                coinGeckoId: 'oraichain-token',
                gasPriceStep: {
                    low: 0.003,
                    average: 0.005,
                    high: 0.007,
                },
            },
        ],
        features: ['ibc-transfer', 'cosmwasm', 'wasmd_0.24+'],
        currencies: [
            {
                coinDenom: 'ORAI',
                coinMinimalDenom: 'orai',
                coinDecimals: 6,
                coinGeckoId: 'oraichain-token',
            },
            {
                coinDenom: 'ATOM',
                coinGeckoId: 'cosmos',
                coinMinimalDenom: 'ibc/A2E2EEC9057A4A1C2C0A6A4C78B0239118DF5F278830F50B4A6BDD7A66506B78',
                coinDecimals: 6,
            },
            {
                coinDenom: 'AIRI',
                coinGeckoId: 'airight',
                coinMinimalDenom: 'cw20:orai10ldgzued6zjp0mkqwsv2mux3ml50l97c74x8sg:airi',
                type: 'cw20',
                contractAddress: 'orai10ldgzued6zjp0mkqwsv2mux3ml50l97c74x8sg',
                coinDecimals: 6,
            },
            {
                coinDenom: 'USDT',
                coinGeckoId: 'tether',
                coinMinimalDenom: 'cw20:orai12hzjxfh77wl572gdzct2fxv2arxcwh6gykc7qh:usdt',
                type: 'cw20',
                contractAddress: 'orai12hzjxfh77wl572gdzct2fxv2arxcwh6gykc7qh',
                coinDecimals: 6,
            },
            {
                coinDenom: 'USDC',
                coinGeckoId: 'usd-coin',
                coinMinimalDenom: 'cw20:orai15un8msx3n5zf9ahlxmfeqd2kwa5wm0nrpxer304m9nd5q6qq0g6sku5pdd:usdc',
                type: 'cw20',
                contractAddress: 'orai15un8msx3n5zf9ahlxmfeqd2kwa5wm0nrpxer304m9nd5q6qq0g6sku5pdd',
                coinDecimals: 6,
            },
            {
                coinDenom: 'OSMO',
                coinMinimalDenom: 'ibc/9C4DCD21B48231D0BC2AC3D1B74A864746B37E4292694C93C617324250D002FC',
                coinDecimals: 6,
                coinGeckoId: 'osmosis',
            },

            {
                coinDenom: 'MILKY',
                coinGeckoId: 'milky-token',
                coinMinimalDenom: 'cw20:orai1gzvndtzceqwfymu2kqhta2jn6gmzxvzqwdgvjw:milky',
                type: 'cw20',
                contractAddress: 'orai1gzvndtzceqwfymu2kqhta2jn6gmzxvzqwdgvjw',
                coinDecimals: 6,
            },
            {
                coinDenom: 'ORAIX',
                coinMinimalDenom: 'cw20:orai1lus0f0rhx8s03gdllx2n6vhkmf0536dv57wfge:oraix',
                type: 'cw20',
                contractAddress: 'orai1lus0f0rhx8s03gdllx2n6vhkmf0536dv57wfge',
                coinGeckoId: 'oraidex',
                coinDecimals: 6,
            },
            {
                coinDenom: 'scORAI',
                coinMinimalDenom: 'cw20:orai1065qe48g7aemju045aeyprflytemx7kecxkf5m7u5h5mphd0qlcs47pclp:scorai',
                type: 'cw20',
                contractAddress: 'orai1065qe48g7aemju045aeyprflytemx7kecxkf5m7u5h5mphd0qlcs47pclp',
                coinGeckoId: 'scorai',
                coinDecimals: 6,
            },

            {
                coinDenom: 'scATOM',
                coinMinimalDenom: 'cw20:orai19q4qak2g3cj2xc2y3060t0quzn3gfhzx08rjlrdd3vqxhjtat0cq668phq:scatom',
                type: 'cw20',
                contractAddress: 'orai19q4qak2g3cj2xc2y3060t0quzn3gfhzx08rjlrdd3vqxhjtat0cq668phq',
                coinGeckoId: 'scatom',
                coinDecimals: 6,
            },

            {
                coinDenom: 'INJ',
                coinGeckoId: 'injective-protocol',
                coinMinimalDenom: 'cw20:orai19rtmkk6sn4tppvjmp5d5zj6gfsdykrl5rw2euu5gwur3luheuuusesqn49:injective',
                contractAddress: 'orai19rtmkk6sn4tppvjmp5d5zj6gfsdykrl5rw2euu5gwur3luheuuusesqn49',
                type: 'cw20',
                coinDecimals: 6,
            },
        ],
    },


}
