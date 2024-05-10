import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Content({ headerHeight }: { headerHeight: string }) {
    return (
        <Container style={{ paddingInline: "0px" }} sx={{ minHeight: `calc(100svh - ${headerHeight})`, pb: '30px' }}>
            <Outlet />
        </Container>
    );
}
