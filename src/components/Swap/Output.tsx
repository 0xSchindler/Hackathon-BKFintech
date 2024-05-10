import { useContext, useEffect, useState } from "react"
// import { SwapContext } from "../../contexts/Swap";
import { Input as InputMui } from '@mui/material';


export default function Output() {
    const [selection, setSelection] = useState(null);
    // const { token1, token2, setToken2, setToken2Amount, output } = useContext(SwapContext);

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
        <div className="d-flex align-items-center" style={{ width: "100%", minHeight: "70px", backgroundColor: "#ebedf0", margin: "20px 0", padding: "10px", borderRadius: "14px", }}>
            <div style={{ width: "100%" }}>
                {/* <h6 className="mb-3">To {output ? <span style={{ fontSize: "12px", color: "#ff005d" }}>(Estimated)</span> : null}</h6> */}
                <h6 className="mb-3">To</h6>
                <div className="row m-0 p-0">
                    <div className="col-9 p-0">
                        {/* <input type="number" className="swap-input full-width" placeholder="0.0" value={output} /> */}
                        {/* <input type="number" className="swap-input full-width" placeholder="0.0" value={0} /> */}
                        <InputMui type="number" sx={{ width: "100%" }} />
                    </div>
                    <div className="col-3" style={{ paddingLeft: '10px', paddingRight: '0px' }}>
                        <select className="swap" style={{ width: "100%", height: '100%' }} onChange={() => { }}>
                            {/* <option disabled={token2 ? true : false} value="" id="reset">Choose</option> */}
                            <option disabled={false} value="" id="reset">Choose</option>
                            <option value="LEMON">LEMON</option>
                            <option value="KTD">KTD</option>
                            <option value="GG">GG</option>
                            <option value="TIG">TIG</option>
                        </select>
                    </div>
                </div>
            </div>

        </div >
    )
}