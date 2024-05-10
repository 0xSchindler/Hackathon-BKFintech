import React from 'react'
import { FormControl, InputLabel, Input, InputAdornment, OutlinedInput, Box, Card } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { imagePath } from 'src/constants/imagePath';


export default function Deposit() {
    return (
        <div>
            <div>Deposit amount</div>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <OutlinedInput
                    type='number'
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">$</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
            </FormControl>
            <div className='py-2' style={{ display: 'flex', justifyContent: 'center' }}>
                <ArrowDownwardIcon />
            </div>
            <Card variant="outlined" sx={{
                width: "100%",
                borderRadius: 3,
                mb: 2,
                paddingInline: 3,
                paddingBlock: 2
            }}>
                <div className='d-flex' style={{ width: '100%', justifyContent: 'space-between', paddingBottom: '6px' }}>
                    <div style={{ fontSize: '30px', fontWeight: '500' }}>
                        3744.64
                    </div>
                    <Card variant="outlined" sx={{
                        borderRadius: 3,
                        display: 'flex',
                        paddingInline: 1.5,
                        paddingBlock: 0.5,
                        alignItems: 'center',
                        gap: 0.5
                    }}>
                        <img src={imagePath.USDT} alt="logo orchai icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
                        <div style={{ fontSize: '18px' }}>USDT</div>
                    </Card>
                </div>
                <div className='d-flex' style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div>
                        $3,743.95
                    </div>
                    <div>
                        Balance: 0
                    </div>
                </div>
            </Card>
            <Card variant="outlined" sx={{
                width: "100%",
                borderRadius: 3,
                mb: 2,
                paddingInline: 3,
                paddingBlock: 2
            }}>
                <div className='d-flex' style={{ width: '100%', justifyContent: 'space-between', paddingBottom: '6px' }}>
                    <div style={{ fontSize: '30px', fontWeight: '500' }}>
                        344.64
                    </div>
                    <Card variant="outlined" sx={{
                        borderRadius: 3,
                        display: 'flex',
                        paddingInline: 1.5,
                        paddingBlock: 0.5,
                        alignItems: 'center',
                        gap: 0.5
                    }}>
                        <img src={imagePath.Orai} alt="logo orchai icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
                        <div style={{ fontSize: '18px' }}>Orai</div>
                    </Card>
                </div>
                <div className='d-flex' style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div>
                        $2,743.95
                    </div>
                    <div>
                        Balance: 0
                    </div>
                </div>
            </Card>
        </div>
    )
}
