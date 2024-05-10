import { TNet } from 'src/global.config';

export const scanTransaction: { [key in TNet]: string } = {
    mainnet: 'https://oraiscan.io/txs/',
};

export const blockPerYear: { [key in TNet]: number } = {
    mainnet: 5131317,
};
