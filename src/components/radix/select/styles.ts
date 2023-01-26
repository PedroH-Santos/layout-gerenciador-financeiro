import styled from "styled-components";
import { Content, Icon, Item, Trigger, Viewport } from "@radix-ui/react-select";
import { DefaultIcon } from "@/css/default";



export const TriggerRadix = styled(Trigger)`
    background-color: ${(props) => props.theme.colors.brown800};
    padding: 0.8rem;
    border: 0;
    border-radius:0.5rem;
    width: 200px;
    color: ${(props) => props.theme.colors.white500};
    display:flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

`

export const ViewPortRadix = styled(Viewport)`
    padding:1rem;
`

export const ContentRadix = styled(Content)`
    background-color: ${(props) => props.theme.colors.brown600};
    overflow: hidden;
    border-radius: 0.4rem;
`

export const ItemRadix = styled(Item)`
    background-color: ${(props) => props.theme.colors.brown600};
    padding: 0.5rem;
    display:flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    color: ${(props) => props.theme.colors.white500};
    &:hover {
        background-color: ${(props) => props.theme.colors.brown500};
    }
`


export const IconFontAwesome = styled(DefaultIcon)`
    width: 0.9rem;
    height: 0.9rem;
`