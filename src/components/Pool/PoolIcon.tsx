import { BlackButton } from "src/components/Button";
import { VerifiedBadge } from "./Badge";
import PoolContainer from "./PoolContainer";

interface IPool {
    token1: string;
    token2: string;
    address: string;
    abi: [] | [any];
    disabled?: boolean;

}

export default function PoolIcon({ token1, token2, disabled }: IPool) {
    return (
        <PoolContainer>
            <div className="d-flex align-items-center">
                <h5 className="me-2">{token1}/{token2}</h5>
                <VerifiedBadge />
            </div>
            <div className="d-flex align-items-end" style={{ height: "80%" }}>
                <BlackButton>{disabled ? "Not available" : "view"}</BlackButton>
            </div>
        </PoolContainer>
    )
}