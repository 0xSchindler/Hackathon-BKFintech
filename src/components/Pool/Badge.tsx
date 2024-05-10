import styled from "styled-components";
const BadgeContainer = styled.div`
    padding: 6px 6px;
    width: fit-content;
    border-radius: 50%;
    display: flex;
    align-items: center;
`

export function VerifiedBadge() {
    return (
        <BadgeContainer
            style={{ backgroundColor: "#1259ff", color: "#fff" }}
        >
        </BadgeContainer>
    )
}