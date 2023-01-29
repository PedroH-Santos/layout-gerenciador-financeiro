import { DefaultInput } from "@/css/default";
import styled from "styled-components";


export const Form = styled.form`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;

    
`


export const InputSelectGroup = styled(DefaultInput)`
    width: 60%;
    height: 100%;
`
export const BoxInput = styled.div`
    display: flex;

    flex-direction: column;
    gap: 1rem;
`
export const BoxBreakInputs= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 3rem;
    width: 100%;
`

export const BoxGroupSelection = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
`