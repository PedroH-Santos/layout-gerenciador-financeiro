import { StatusMessageApi } from "@/hooks/useMessageApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { NumericFormat } from "react-number-format";
import styled from "styled-components";



export const DefaultButton = styled.button`
    background-color: ${(props) => props.theme.colors.brown600};
    color: ${(props) => props.theme.colors.white500};
    padding: 1rem 3rem;
    border-radius:0.5rem;
    text-align: center;
    transition: all 0.3s ease-in-out;
    &:hover {
        opacity: 0.8;
    }

`

export const DefaultButtonLink = styled.a`
    background-color: ${(props) => props.theme.colors.brown600};
    color: ${(props) => props.theme.colors.white500};
    padding: 1rem 3rem;
    border-radius:0.5rem;
    text-align: center;
    display:flex;
    gap: 1rem;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover {
        opacity: 0.8;
    }

`

export const DefaultButtonReactLink = styled(Link)`
    background-color: ${(props) => props.theme.colors.brown600};
    color: ${(props) => props.theme.colors.white500};
    padding: 1rem 3rem;
    border-radius:0.5rem;
    text-align: center;
    display:flex;
    gap: 1rem;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover {
        opacity: 0.8;
    }

`

export const DefaultIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.white500};
    width: 1.2rem;
    height: 1.2rem;

    &:hover {
        cursor: pointer;
    }
`




export const DefaultLabel = styled.label`
    color: ${(props) => props.theme.colors.white500};
    margin-right: 1rem;
    align-items: center;
    text-align: center;


`

export const DefaultInput = styled.input`
    background-color: ${(props) => props.theme.colors.brown800};
    padding: 0.8rem;
    border: 0;
    border-radius:0.5rem;
    color: ${(props) => props.theme.colors.white500};
    
    &:focus {
        outline: none;
    }
    &:read-only {
        background-color: ${(props) => props.theme.colors.brown900};
        cursor: not-allowed;
    }
`

export const DefaultInputPrice = styled(NumericFormat)`
    background-color: ${(props) => props.theme.colors.brown800};
    padding: 0.8rem;
    border: 0;
    border-radius:0.5rem;
    color: ${(props) => props.theme.colors.white500};
    
    &:focus {
        outline: none;
    }
    &:read-only {
        background-color: ${(props) => props.theme.colors.brown900};
        cursor: not-allowed;
    }  
`


type DefaultMessageApiProps = {
    status: StatusMessageApi;
}

export const DefaultMessageApi = styled.div<DefaultMessageApiProps>`
    background-color: ${(props) => (props.status == StatusMessageApi.SUCCESS) ? props.theme.colors.green500 : props.theme.colors.red500};
    padding: 2rem;
    color: ${(props) => props.theme.colors.white500}; 
    border-radius: 1rem;
`


export const DefaultInputError =styled.div`
    color: ${(props) => props.theme.colors.red500}
`