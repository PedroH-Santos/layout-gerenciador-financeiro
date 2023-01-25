import { Content, Overlay, Title, Trigger } from "@radix-ui/react-dialog";
import styled from "styled-components";

export const BaseOverlay = styled(Overlay)`
 background-color: ${(props) => props.theme.colors.black500};
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.8;

`


export const BaseContent = styled(Content)`
    background-color:${(props) => props.theme.colors.brown300};
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 3rem;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`


export const BaseTrigger = styled(Trigger)`
    background-color: unset;
`

export const BaseTitle = styled(Title)`
    color: ${(props) => props.theme.colors.white500};
    text-align: center;
`