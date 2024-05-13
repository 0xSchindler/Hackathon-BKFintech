// import { useContext } from "react"
// import { SwapContext } from "../../contexts/Swap";
import { Input as InputMui, FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { imagePath } from 'src/constants/imagePath';

export default function Input() {
    const [age, setAge] = useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value);
    };

    // const { token1, token2, setToken1, setToken2, setToken1Amount } = useContext(SwapContext);
    // const handleSelect = (e: any) => {
    //     setToken2("");
    //     setToken1(e.target.value);
    // }
    // const handleAmountChange = (e: any) => {
    //     return setToken1Amount(e.target.value);
    // }

    // const renderElement = () => {
    //     let element;
    //     if (Number(age) == 10)
    //         <div className="d-flex">
    //             <img src={imagePath.Orai} alt="logo orchai icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
    //             <span>Orai</span>
    //         </div>
    //     else
    //         <div className="d-flex">
    //             <img src={imagePath.USDT} alt="logo orchai icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
    //             <span>USDT</span>
    //         </div>
    //     return element;
    // }

    return (
        <div className="d-flex align-items-center" style={{ width: "100%", borderRadius: "14px" }}>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ display: 'flex', gap: 1 }}
                    inputProps={{
                        'aria-label': 'Without label', display: 'flex'
                    }}
                // native={false}
                // renderValue={renderElement}
                >
                    <MenuItem value={10} sx={{ display: 'flex', gap: 1 }}>
                        <img src={imagePath.Orai} alt="logo orchai icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
                        <span>Orai</span>
                    </MenuItem>
                    <MenuItem value={20} sx={{ display: 'flex', gap: 1 }}>
                        <img src={imagePath.USDT} alt="logo orchai icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
                        <span>USDT</span>
                    </MenuItem>
                </Select>
            </FormControl>
        </div >
    )
}