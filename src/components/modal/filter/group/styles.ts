import { DefaultButton, DefaultIcon, DefaultButtonLink } from "@/css/default"
import styled from "styled-components"



export const Button = styled(DefaultButtonLink)`
    padding: 1rem 1.5rem;
`


export const FilterIcon = styled(DefaultIcon)`
    margin-right:0.5rem;
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

export const BoxInput = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
`