import { CopyAll, ExpandMoreRounded, HourglassEmpty } from '@mui/icons-material';
import { Box, Button, ClickAwayListener, Divider, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { rotateInfinity } from 'src/assets/animations/rotate';
import { infoChainConnecting, infoWalletConnecting, useWalletContext } from 'src/contexts/wallet-context/wallet-context';
import useNotifier from 'src/hooks/useNotifier';
import { copyTextToClipboard } from 'src/utils';
import { formatAddress } from 'src/utils/format';

export default function ButtonConnectWallet() {
    const { isConnecting, getUserAddressConnecting } = useWalletContext();
    if (isConnecting) {
        return <ConnectingButton />;
    }
    const address = getUserAddressConnecting();
    if (address) {
        return <ConnectedButton address={address} />;
    }
    return <NotconnectedButton />;
}

// Todo: Button khi chưa connect wallet => Click => mở modal select wallet tương ứng với chain hiện tại đang được chọn
function NotconnectedButton() {
    const { openModalSelectWallet, chainConnected } = useWalletContext();
    async function onClickConnect() {
        openModalSelectWallet(chainConnected);
    }
    return (
        <Box sx={{ position: 'relative', width: 'fit-content' }}>
            <Button variant="contained" onClick={onClickConnect}>
                Connect wallet
            </Button>
        </Box>
    );
}

// Todo: Button khi đang kết nối wallet => Loading ...
function ConnectingButton() {
    return (
        <Box>
            <Button
                variant="contained"
                disabled
                startIcon={
                    <HourglassEmpty
                        sx={{
                            fontSize: '17px',
                            animation: rotateInfinity,
                        }}
                    />
                }
            >
                {'Connecting...'}
            </Button>
        </Box>
    );
}

// Todo: Button khi đã connect wallet => Click => mở popup menu
function ConnectedButton({ address }: { address: string }) {
    const [open, setOpen] = React.useState(false);
    const { notifySuccess } = useNotifier();
    const { chainConnected, walletConnected, getSmartWalletConnecting, disconnectWallet } = useWalletContext();

    // const { smartWallet, isDefault: isDefaultSmartContract } = getSmartWalletConnecting();
    const infoChainConnected = infoChainConnecting[chainConnected];
    const ChainIcon = infoChainConnected.logoChain;

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    function _copyText(_address: string) {
        copyTextToClipboard(_address);
        notifySuccess('Copied address!', { anchorOrigin: { horizontal: 'right', vertical: 'top' }, autoHideDuration: 1000 });
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', width: 'fit-content' }}>
                <Button variant="contained" onClick={handleClick} sx={{ textTransform: 'none', px: 2 }}>
                    <img src={infoWalletConnecting[walletConnected].logoWallet} alt="logo wallet" style={{ width: '20px', height: '20px', borderRadius: '4px', marginRight: '4px' }} />
                    {/* <Typography variant="h6"> */}
                    {formatAddress(address, 5, 4)}
                    {/* </Typography> */}
                    <ExpandMoreRounded />
                </Button>
                {open ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '40px',
                            right: 0,
                            width: 'fit-content',
                            bgcolor: 'background.paper',
                            minWidth: '180px',
                            borderRadius: '16px',
                            boxShadow: 4,
                            py: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', placeItems: 'center', px: 2, justifyContent: 'center', mb: 1 }}>
                            <ChainIcon sx={{ fontSize: '25px', mr: 1 }} />

                            <Typography variant="body2" fontWeight={600} textAlign={'center'} sx={{ display: 'block' }}>
                                {infoChainConnected.name}
                            </Typography>
                        </Box>
                        <Divider />

                        <Box sx={{ display: 'flex', placeItems: 'center', px: 2, mt: 2 }}>
                            <Box mr={'auto'} textAlign={'left'}>
                                <Typography variant="body2" color={'text.secondary'}>
                                    Wallet
                                </Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    {infoWalletConnecting[walletConnected].name}
                                </Typography>
                            </Box>

                            <img src={infoWalletConnecting[walletConnected].logoWallet} alt="logo wallet" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                        </Box>

                        <MenuItem sx={{ mt: 1, flexDirection: 'column', placeItems: 'start' }} onClick={() => _copyText(address)}>
                            <Typography variant="body2" color={'text.secondary'}>
                                Account address
                            </Typography>
                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                                <Typography variant="body2" fontWeight={600}>
                                    {formatAddress(address, 5, 4)}
                                </Typography>
                                <CopyAll sx={{ fontSize: '20px' }} />
                            </Box>
                        </MenuItem>
                        <MenuItem sx={{ mt: 1 }} onClick={disconnectWallet}>
                            <Typography variant="body2" color={'text.secondary'} fontWeight={500}>
                                Disconnect
                            </Typography>
                        </MenuItem>
                    </Box>
                ) : null}
            </Box>
        </ClickAwayListener>
    );
}
