import { DefaultButton } from "@/css/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Content, Title, Root, Overlay } from "@radix-ui/react-dialog";
import styled from "styled-components";

export const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.white500};
    width: 1.2rem;
    height: 1.2rem;

    &:hover {
        cursor: pointer;
    }
`
export const DialogOverlay = styled(Overlay)`
 background-color: ${(props) => props.theme.colors.black500};
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.8;

`

export const DialogContent = styled(Content)`
    background-color:${(props) => props.theme.colors.brown300};
    padding: 2rem;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 600px;
    height: 200px;
    padding: 3rem;
    text-align:center;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: 3rem;
    
`

export const DialogTitle = styled(Title)`
    color: ${(props) => props.theme.colors.white500};
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