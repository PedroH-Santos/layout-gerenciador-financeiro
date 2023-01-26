import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
`