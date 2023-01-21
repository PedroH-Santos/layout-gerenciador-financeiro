import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";



export const Container = styled.div`
    border: 1px solid ${(props) => props.theme.colors.white500};
    border-right: 0px;
    border-left: 0px;
    display:flex;
    gap: 1rem;
    justify-content:center;
    align-items:center;
    width: 100%;
`
export const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.white500};
    width: 1.5rem;
    height: 1.5rem;
`

export const Text = styled.p`
    color: ${(props) => props.theme.colors.white500};
`