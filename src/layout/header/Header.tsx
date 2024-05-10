import { HelpOutlineRounded } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import ButtonConnectWallet from 'src/components/ButtonConnectWallet/ButtonConnectWallet';

export default function Header({ headerHeight }: { headerHeight: string }) {
    // const { pathname } = useLocation();

    const IconPage = HelpOutlineRounded;
    return (
        // <Box sx={{ height: headerHeight, bgcolor: 'background.header', position: 'sticky', top: '0', left: 0, width: '100%', zIndex: '900' }}>
        <Container sx={{ height: headerHeight, display: 'flex', placeItems: 'center', bgcolor: "#EFF1F2", borderRadius: 3, my: 2 }}>
            <Box sx={{ display: 'flex', placeItems: 'center' }}>
                <Typography variant="h4">AMM</Typography>
            </Box>
            <Box sx={{ ml: 'auto', mr: 1 }}>
            </Box>
            <Box>
                <ButtonConnectWallet />
            </Box>
        </Container>
        // </Box>
    );
}
