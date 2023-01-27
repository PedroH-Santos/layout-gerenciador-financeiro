import { DefaultButton } from "@/css/default";
import { Title } from "@radix-ui/react-dialog";
import styled from "styled-components";
import { BaseContent, BaseTrigger } from "../../base/styles";




export const DialogContent = styled(BaseContent)`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 600px;
    max-width: 600px;
    height: 200px;
    text-align:center;
    
`


export const DeleteButton = styled(DefaultButton)`
    background-color: ${(props) => props.theme.colors.red500};
`

export const BackButton = styled(DefaultButton)`
    background-color: ${(props) => props.theme.colors.brown800}; 
`
export const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content:center;
  
`

export const DialogTrigger = styled(BaseTrigger)`
    display:flex;
    gap: 1rem;
`