import styled from "styled-components";
import { BaseContent, BaseTrigger } from "../base/styles";


export const DialogTrigger = styled(BaseTrigger)`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    gap: 1rem; 
`;


export const DialogContent = styled(BaseContent)`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 400px;
    max-width: 600px;
    height: auto;
    text-align:center;
    
`

export const UserIcon = styled.div`
    border-radius:2rem;
    background-color: ${(props) => props.theme.colors.white500};
    padding:2rem;

`
export const UserName = styled.p`
    color: ${(props) => props.theme.colors.white500};
`

export const BoxInput = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
`


export const BoxUpload = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`

export const UserIconConfig = styled(UserIcon)`
    border-radius:4rem;
    background-color: ${(props) => props.theme.colors.brown800};
    width: 100px;
    height: 100px;
    display:flex;
    justify-content: center;
    align-items: center;
`

export const Form = styled.form`
    margin-top: 2rem;
    padding: 1rem;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;
    gap: 2rem;

`