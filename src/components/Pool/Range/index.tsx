import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Card } from '@mui/material'

function valuetext(value: number) {
    return `${value}°C`;
}

export default function Range() {
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div>
            <div>Range</div>
            <Card variant="outlined" sx={{
                width: "100%",
                borderRadius: 3,
                mb: 2,
                mt: 2,
                paddingInline: 3,
                paddingBlock: 2
            }}>
                <Box sx={{}}>
                    <Box sx={{ display: 'flex', gap: 3, width: '100%' }}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    Min Price
                                </Box>
                                <Box>
                                    ({Number(value[0]) - 50}.00)%
                                </Box>
                            </Box>
                            <Card variant="outlined" sx={{
                                width: "100%",
                                borderRadius: 3,
                                mb: 2,
                                paddingInline: 3,
                                paddingBlock: 2,
                                textAlign: 'center'
                            }}>
                                9,4
                            </Card>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    Max Price
                                </Box>
                                <Box>
                                    ({Number(value[1]) - 50}.00)%
                                </Box>
                            </Box>
                            <Card variant="outlined" sx={{
                                width: "100%",
                                borderRadius: 3,
                                mb: 2,
                                paddingInline: 3,
                                paddingBlock: 2,
                                textAlign: 'center'
                            }}>
                                12
                            </Card>
                        </Box>
                    </Box>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Box>
            </Card>
        </div >
    )
}
