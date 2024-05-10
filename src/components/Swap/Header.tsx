import { useContext, useEffect, useState } from "react";
// import { SwapContext } from "../../contexts/Swap";
// import { fromWei } from "../../utils/convert";

const bnbIcon = "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Binance-Coin-BNB-icon.png";

export default function Header() {
    // const { balance, token1 } = useContext(SwapContext);
    return (
        <div className="full-width mt-3 ">
            <h4>Swap</h4>
            <p style={{ fontSize: "14px" }}>Trade tokens in an instant</p>
            {/* <hr /> */}
        </div>
    )
} 