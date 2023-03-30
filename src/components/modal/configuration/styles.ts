import styled from "styled-components";
import { BaseContent, BaseTrigger } from "../base/styles";
import Image from "next/image"


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
    background-color: ${(props) => props.theme.colors.brown500};
     height: 4rem;
     width: 100%;
     border-radius: 5rem;
     overflow: hidden;

`


export const ImageUser = styled(Image)`
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 100% 100%; 
    
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
    gap: 1rem;

`


export const BoxImagePreLoad = styled.div`
    background-color: ${(props) => props.theme.colors.brown500};
     height: 200px;
     width: 60%;
     border-radius: 5rem;
     overflow: hidden;

    

`

export const ImagePreLoad = styled(Image)`
    height: 100%;
    width: 100%;
    padding: 2rem;
    object-fit: cover;
    object-position: 25% 25%; 
    
`

export const BoxInputFile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`