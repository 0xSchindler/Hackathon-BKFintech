import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { IconSpinLoading } from 'src/assets/icon';
import { infoChainConnecting, infoWalletConnecting, useWalletContext } from 'src/contexts/wallet-context/wallet-context';
import { Props } from './ModalSelectConnectWallet';
import { ClearRounded } from '@mui/icons-material';

export default function ModalSelectConnectWallet({ open, chain, isChangeSelectNetwork = false, closeModal, selectWalletToConnect }: Props) {
    const { connectChainAndWallet, isConnecting } = useWalletContext();

    const infoChain = infoChainConnecting[chain];
    const ChainIcon = infoChain.logoChain;

    function onExit() {
        closeModal();
    }

    return (
        <Dialog open={open} fullWidth maxWidth={'xs'}>
            <DialogTitle>
                <Box sx={{ display: 'flex', placeItems: 'start' }}>
                    <Box>
                        <Typography variant="h5">Choose Wallet</Typography>
                        <Typography variant="body2">Safely connect to your existing blockchain wallet and directly stake tokens in them.</Typography>
                    </Box>
                    <ClearRounded sx={{ color: 'text.secondary', fontSize: '26px', cursor: 'pointer' }} onClick={onExit} />
                </Box>
            </DialogTitle>
            <DialogContent>
                {isConnecting ? (
                    <Box py={5}>
                        <IconSpinLoading sx={{ fontSize: '120px' }} />
                    </Box>
                ) : (
                    <>
                        <Typography textAlign={'center'} variant="body2">
                            {/* Connecting */}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', placeItems: 'center', mb: 3 }}>
                            <ChainIcon sx={{ fontSize: '40px', display: 'block', mr: 1 }} />
                            <Typography variant="h4" fontWeight={600}>
                                {infoChain.name}
                            </Typography>
                        </Box>
                        <Box mt={2} mb={4}>
                            {infoChain.walletSupport.map((wallet, index) => {
                                const walletInfo = infoWalletConnecting[wallet];
                                return (
                                    <Box
                                        key={wallet + index}
                                        sx={{
                                            borderRadius: '8px',
                                            bgcolor: '#E9F4F7',
                                            px: 2.5,
                                            display: 'flex',
                                            gap: 1.5,
                                            py: 1,
                                            mb: 1,
                                            placeItems: 'center',
                                            cursor: 'pointer',
                                            '&:hover': { '& > .wallet-name': { color: 'primary.main' } },
                                        }}
                                        onClick={() => selectWalletToConnect(chain, wallet, isChangeSelectNetwork)}
                                    >
                                        <img src={walletInfo.logoWallet} alt={`logo wallet ${walletInfo.name}`} style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                                        <Typography className="wallet-name" variant="body2" fontWeight={600} sx={{ transition: 'color 0.2s' }}>
                                            {walletInfo.name}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </>
                )}
                {/* <Typography variant="body3" textAlign={'center'}>
                {'By connecting, I accept Orchai’s'}
            </Typography>
            <Typography variant="body3" sx={{ '& > a': { color: 'primary.main', textDecoration: 'none' }, mt: 1 }} textAlign={'center'}>
                <Link to={'https://orchai.io/terms-of-service'} target="_blank">
                    Terms of Service,{' '}
                </Link>
                <Link to={'https://orchai.io/privacy-policy'} target="_blank">
                    Privacy Policy,{' '}
                </Link>
                and
                <Link to={'https://orchai.io/cookies-policy'} target="_blank">
                    {' '}
                    Cookies Policy
                </Link>
            </Typography> */}
            </DialogContent>
        </Dialog>
    );
}
