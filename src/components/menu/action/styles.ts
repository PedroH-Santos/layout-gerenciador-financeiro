import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";



export const Container = styled(Link)`
    border: 2px solid ${(props) => props.theme.colors.white500};
    border-right: 0px;
    border-left: 0px;
    display:flex; 
    gap: 1rem;
    justify-content:center;
    align-items:center;
    width: 100%;
    padding: 1rem;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: ${(props) => props.theme.colors.brown500};
    }
`
export const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.white500};
    width: 1.5rem;
    height: 1.5rem;
`

export const Text = styled.p`
    color: ${(props) => props.theme.colors.white500};
`