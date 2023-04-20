import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import styled, { ThemedStyledProps } from "styled-components";

export enum IconsType {
    "POSITIVE",
    "NEGATIVE"
}

type IconsProps =  {
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




export const TextWallet = styled.span``
export const Icons = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;

`

export const BoxWallet = styled.div<IconsProps>`
    background-color: ${(props) => props.theme.colors.brown700};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 6rem;
    gap: 0.5rem;
    border-radius:0.5rem;

    ${Icons} {
        color: ${(props) => props.wallet == IconsType.POSITIVE ? props.theme.colors.green500 : props.theme.colors.red500};

    }
    ${TextWallet}  {
        color: ${(props) => props.wallet == IconsType.POSITIVE ? props.theme.colors.green500 : props.theme.colors.red500};
    }
`

export const BoxButton = styled.div`
    display:flex;
    gap: 2rem;
`

export const BoxTileAndActions = styled.div`
    margin-top: 3rem; 
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`


export const TextTitle = styled.h1`
    color: ${(props) => props.theme.colors.white500};
`