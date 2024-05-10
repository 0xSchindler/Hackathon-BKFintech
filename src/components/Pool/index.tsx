import styled from "styled-components";
import PoolContainer from "./PoolContainer";
import PoolIcon from "./PoolIcon";
import Input from "./Pair/Input";
import Output from "./Pair/Output";
import Fees from "./Fees"
import Deposit from "./Deposit";
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';
import Range from "./Range";
import { Button } from '@mui/material';
export default function Pool() {

    return (
        <div style={{ maxWidth: "700px" }} className="mx-auto">
            <div style={{ width: '100%' }} className="py-1">
                <div>Select pair</div>
                <div className="d-flex gap-3 my-2 align-items-center">
                    <Input />
                    <CurrencyExchangeSharpIcon sx={{ cursor: 'pointer' }} />
                    <Output />
                </div>
            </div>
            <div style={{ width: '100%' }} className="py-1">
                <Fees />
            </div>
            <div style={{ width: '100%' }} className="py-1">
                <Deposit />
            </div>
            <div style={{ width: '100%' }} className="py-1">
                <Range />
            </div>
            <Button variant="contained" sx={{
                width: '100%', fontSize: '20px', borderRadius: 3, paddingBlock: 1.5
            }}>
                Provide liquidity
            </Button>
        </div >
    )
}