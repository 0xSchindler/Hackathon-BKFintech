import React from 'react'
import { FormControl, InputLabel, Input, InputAdornment, OutlinedInput, Box, Card, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { imagePath } from 'src/constants/imagePath';

export default function CardPosition() {
    return (
        // <SwapProvider>
        <Card variant="outlined" sx={{
            borderRadius: 3,
            paddingInline: 2.5,
            paddingBlock: 2,
            alignItems: 'center',
            gap: 0.5,
        }}>
            <div className='d-flex align-items-center'>
                <img src={imagePath.USDT} alt="logo usdt icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
                <img src={imagePath.Orai} alt="logo orchai icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
                <span style={{ marginLeft: '3px', fontSize: '18px' }}>
                    ORAI-USDT LP
                </span>
                <Card variant="outlined" sx={{
                    borderRadius: 3,
                    display: 'flex',
                    paddingInline: 1.5,
                    paddingBlock: 0.5,
                    alignItems: 'center',
                    gap: 0.5,
                    marginLeft: 2,
                    borderColor: '#CE93D8',
                    border: 1,
                    color: '#CE93D8'
                }}>0.25%</Card>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    Min 1,627.22 / Max 2,539.21 CAKE2 per tBNB
                </div>
                <div className='d-flex gap-2'>
                    <Button variant="contained" color="success" sx={{ borderRadius: 3 }}>
                        Collect
                    </Button>
                    <Button variant="contained" color="error" sx={{ borderRadius: 3 }}>
                        Burn
                    </Button>
                </div>
            </div>
        </Card>
    )
}