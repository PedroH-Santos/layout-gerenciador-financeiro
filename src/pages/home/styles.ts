import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import styled, { ThemedStyledProps } from "styled-components";

export enum IconsType {
    "POSITIVE",
    "NEGATIVE"
}

type IconsProps = ThemedStyledProps<FontAwesomeIconProps, any> & {
    wallet: IconsType
}


export const Body = styled.div`
    width: 80%;
    height: auto;
`


export const BoxHeader = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    gap: 2rem;
    max-width:100%;
    margin-top: 2rem;

`


export const BoxWallet = styled.div`
    background-color: ${(props) => props.theme.colors.brown700};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 6rem;
    gap: 0.5rem;
    border-radius:0.5rem;
`

export const TextWallet = styled.span`
    color: ${(props) => props.theme.colors.green500};


`


export const Icons = styled(FontAwesomeIcon)<IconsProps>`
    color: ${(props) => props.wallet == IconsType.POSITIVE ? props.theme.colors.green500 : props.theme.colors.red500};
    width: 1rem;
    height: 1rem;

`


export const BoxButton = styled.div`
    margin-top: 3rem; 
    display:flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
`

