import { Box } from '@mui/material';
import Providers from 'src/contexts/Providers';
import Header from './header/Header';
import Content from './content/Content';

export default function Layout() {
    const sidebarWidth = '0xp';
    const headerHeight = '66px';
    return (
        <Providers>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{ position: 'relative', zIndex: 1, ml: { xs: 0, lg: sidebarWidth } }}>
                    <Header headerHeight={headerHeight}></Header>
                    <Content headerHeight={headerHeight}></Content>
                </Box>
            </Box>
        </Providers>
    );
}
