import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import React from 'react';
import { WalletProvider } from './wallet-context/wallet-context';
import { ModalProvider } from './modal-context/modal-context';

const notistackRef = React.createRef<SnackbarProvider>();
const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
};

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SnackbarProvider
            maxSnack={3}
            ref={notistackRef}
            preventDuplicate
            action={(key) => (
                <IconButton size="small" color="inherit" onClick={onClickDismiss(key)}>
                    <Clear style={{ cursor: 'pointer' }} />
                </IconButton>
            )}
        >
            <WalletProvider>
                <ModalProvider>{children}</ModalProvider>
            </WalletProvider>
        </SnackbarProvider>
    );
}
