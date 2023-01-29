import { DefaultButton } from "@/css/default"
import { Trigger } from "@radix-ui/react-dialog"
import styled from "styled-components"



export const DialogTrigger = styled(Trigger)`
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

export const Form = styled.form`
    margin-top: 2rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 2rem;
    flex-flow: row wrap;

`

export const BoxInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
   
`

export const BoxBreak = styled.div`
    width: 100%;
    display:flex;
    justify-content: center;
`

export const BoxOptions = styled.div`
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
`