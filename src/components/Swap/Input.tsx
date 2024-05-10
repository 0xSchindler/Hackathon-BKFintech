// import { useContext } from "react"
// import { SwapContext } from "../../contexts/Swap";
import { Input as InputMui, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

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
    return (
        <div className="d-flex align-items-center" style={{ width: "100%", minHeight: "70px", backgroundColor: "#ebedf0", margin: "20px 0", padding: "10px", borderRadius: "14px", }}>
            <div style={{ width: "100%" }}>
                <h6 className="mb-3">From</h6>
                <div className="row m-0 p-0">
                    <div className="col-9 p-0" >
                        {/* <input type="number" className="swap-input full-width" placeholder="0.0" onChange={handleAmountChange} /> */}
                        {/* <input type="number" className="swap-input full-width" placeholder="0.0" onChange={() => { }} /> */}
                        <InputMui type="number" sx={{ width: "100%" }} />
                    </div>
                    <div className="col-3" style={{ paddingLeft: '10px', paddingRight: '0px' }}>
                        <select className="swap" style={{ width: "100%", height: '100%' }} onChange={() => { }}>
                            <option value="BNB">BNB</option>
                            <option value="WBNB">WBNB</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
    )
}