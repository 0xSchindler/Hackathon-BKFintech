// import { SwapProvider } from "../../contexts/Swap";
import Container from "./Container";
import Header from "./Header";
import Input from "./Input";
import Output from "./Output";
import SwapButton from "./SwapButton";
import CurrencyExchangeSharpIcon from '@mui/icons-material/CurrencyExchangeSharp';


export default function Swap() {
    return (
        // <SwapProvider>
        <div className="d-flex justify-content-center align-items-center full-width" style={{ minHeight: "500px" }}>
            <Container>
                <Header />
                <h6 className="mb-3">From</h6>
                <Input />
                <div className="d-flex justify-content-between">
                    <h6 className="mb-3">To</h6>
                    <h6>1 USDT ≈ 0.088243 ORAI</h6>
                </div>

                <Output />
                <SwapButton />
            </Container>
        </div>
        // </SwapProvider>
    )
}