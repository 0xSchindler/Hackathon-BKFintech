import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const listFee = [
    {
        fees: "0.01%",
        select: "1% select"
    },
    {
        fees: "0.05%",
        select: "31% select"
    },
    {
        fees: "0.30%",
        select: "67% select"
    },
    {
        fees: "1.00%",
        select: "1% select"
    }
]

export default function Fees() {
    const [isShow, setIsShow] = useState(false);
    const [feeSelected, setFeeSelected] = useState(0);


    return (
        <div style={{ width: '100%' }}>
            <Card variant="outlined" sx={{
                width: "100%",
                borderRadius: 3,
                mb: 2
            }}>
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Typography gutterBottom variant="h5" component="div">
                                {listFee[feeSelected].fees} fees tier
                            </Typography>
                            <Typography gutterBottom component="p">
                                {listFee[feeSelected].select} select
                            </Typography>
                        </Box>
                        <Button variant="outlined" onClick={() => setIsShow(pre => !pre)}>{isShow ? "Hide" : "Show"}</Button>
                    </Stack>
                </Box>
            </Card>
            {
                isShow ?
                    <Box sx={{ display: 'flex', gap: 2 }} justifyContent="space-between">
                        {
                            listFee.map((item, index) =>
                                <Card variant="outlined" sx={{
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    borderColor: `${feeSelected == index ? '#355DDE' : ''
                                        }`
                                }}
                                    onClick={() => setFeeSelected(index)}
                                >
                                    <Box sx={{ p: 2 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Box>
                                                <Typography gutterBottom component="p">
                                                    {item.fees} fees tier
                                                </Typography>
                                                <Typography gutterBottom component="p">
                                                    {item.select} select
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        {/* <Typography color="text.secondary" variant="body2">
                                            Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
                                            just down the hall.
                                        </Typography> */}
                                    </Box>
                                </Card>
                            )
                        }
                    </Box>
                    : null
            }
        </div >
    )
}
