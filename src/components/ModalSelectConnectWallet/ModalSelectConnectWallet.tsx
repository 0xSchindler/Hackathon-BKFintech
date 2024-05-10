// import { ClearRounded } from '@mui/icons-material';
import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chainconnected, LocalStorageKey, WalletConnected } from 'src/constants';
import { sleep } from 'src/utils';

export type TDataModalSelectWallet = {
    open: boolean;
    chain: Chainconnected;
    isChangeSelectNetwork: boolean;
};
export type Props = TDataModalSelectWallet & {
    closeModal: () => void;
    selectWalletToConnect(chain: Chainconnected, wallet: WalletConnected, isChangeSelectNetworkAction: boolean): Promise<void>;
};

