// import { useContext } from "react"
// import { SwapContext } from "../../contexts/Swap";
import { useEffect, useState } from 'react';
import { Input as InputMui, FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import { imagePath } from 'src/constants/imagePath';
import { useWalletContext } from 'src/contexts/wallet-context/wallet-context';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import BigNumber from 'bignumber.js';
import { TKeyContractToken } from 'src/contexts/wallet-context/hooks/cosmos-network/connect-oraichain/contractFunction';

export default function Output() {
    const { oraichain, assetTokens, ctrAddress } = useWalletContext();
    const [token, setToken] = useState<TKeyContractToken | null | "ORAI">(null);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState<BigNumber>(BN(0));

    const handleChange = (event: any) => {
        setToken(event.target.value);
    };

    const getBalance = async () => {
        setLoading(true)
        if (token != null) {
            const { ctrFunction, address, baseDivident, client } = oraichain;
            try {
                if (token == 'ORAI') {
                    const res = await client?.getBalance(address, 'orai');
                    setBalance(BN(res?.amount).div(baseDivident))
                } else {
                    const res = await oraichain.query(ctrFunction.tokenBalance(token, address));
                    setBalance(BN(res.data.balance).div(baseDivident))
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        getBalance()
    }, [token])

    return (
        <div className="d-flex align-items-center" style={{ width: "100%", minHeight: "70px", backgroundColor: "#ebedf0", marginBottom: "20px", padding: "10px", borderRadius: "14px", paddingTop: '15px' }}>
            <div style={{ width: "100%" }}>
                <div className="row m-0">
                    <div style={{ fontSize: '14px' }}>Balance: {loading ? "..." : formatNumber(balance)} {token}</div>
                    <div className="col-8" style={{ alignSelf: 'flex-end', paddingBottom: '10px' }}>
                        <InputMui type="number" sx={{ width: "100%", fontSize: '20px' }} />
                    </div>
                    <div className="col-4" style={{ paddingLeft: '10px' }}>
                        <FormControl style={{ padding: '0px' }} fullWidth sx={{ m: 1, minWidth: 100, paddingRight: '0px' }}>
                            <Select
                                value={token}
                                onChange={handleChange}
                                displayEmpty
                                sx={{ display: 'flex', gap: 1, padding: '0px' }}
                                inputProps={{
                                    'aria-label': 'Without label', display: 'flex'
                                }}
                            >
                                <MenuItem value={"ORAI"} sx={{ display: 'flex', gap: 1 }}>
                                    <img src={imagePath.Orai} alt="logo orchai icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
                                    <span>Orai</span>
                                </MenuItem>
                                <MenuItem value={"USDT"} sx={{ display: 'flex', gap: 1 }}>
                                    <img src={imagePath.USDT} alt="logo orchai icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
                                    <span>USDT</span>
                                </MenuItem>
                                <MenuItem value={'USDC'} sx={{ display: 'flex', gap: 1 }}>
                                    <img src={imagePath.USDC} alt="logo orchai icon" width={22} height={22} style={{ borderRadius: '50%', background: 'white', padding: '2px' }} />
                                    <span>USDC</span>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>

    )
}