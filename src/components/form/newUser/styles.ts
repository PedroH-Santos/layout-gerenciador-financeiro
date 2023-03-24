import { DefaultInput } from "@/css/default"
import Image from "next/image"
import styled from "styled-components"

export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
`

export const BoxInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`


export const BoxInputFile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`

export const Button = styled.button`
    background-color: ${(props) => props.theme.colors.brown600};
    color: ${(props) => props.theme.colors.white500};
    padding: 1rem;
    width: 10rem;
    border-radius: 0.5rem;
    border: 0px;

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
export const InputFile = styled(DefaultInput)`

`
