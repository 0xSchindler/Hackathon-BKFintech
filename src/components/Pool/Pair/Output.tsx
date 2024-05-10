import { Input as InputMui, FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { imagePath } from 'src/constants/imagePath';


export default function Output() {
    const [selection, setSelection] = useState(null);
    // const { token1, token2, setToken2, setToken2Amount, output } = useContext(SwapContext);

    const [age, setAge] = useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value);
    };

    // const handleSelect = (e: any) => {
    //     return setToken2(e.target.value);
    // }
    // const handleAmountChange = (e: any) => {
    //     return setToken2Amount(e.target.value);
    // }
    // useEffect(() => {
    //     const reset: any = document.getElementById("reset")?.click();
    // }, [token2])

    return (
        <div className="d-flex align-items-center" style={{ width: "100%", borderRadius: "14px", }}>
            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
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