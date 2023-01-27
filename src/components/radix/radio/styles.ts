import { DefaultIcon } from "@/css/default";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { Indicator, Item } from "@radix-ui/react-radio-group";
import styled, { ThemedStyledProps } from "styled-components";



export enum TypesOptions {
    "DEPOSIT",
    "WITHDRAW"
}

type IconProps = ThemedStyledProps<FontAwesomeIconProps, any> & {
    typeoption: TypesOptions;
}



export const Line = styled.div`
    border-right: 2px solid ${(props) => props.theme.colors.white500};;
`

export const BoxOptions = styled.div`
    display: flex;
    flex-direction: row;
`

export const RadixItem = styled(Item)`
    background-color: ${(props) => props.checked ? props.theme.colors.brown800 :  props.theme.colors.brown600};
    padding: 1rem;
    width: 200px;
    display:flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    &:hover {
        background-color: ${(props) => props.theme.colors.brown800};
    }
    &:focus {
        background-color: ${(props) => props.theme.colors.brown800};
    }

`
export const RadixIndicator = styled(Indicator)`
    display:none;

`


export const Icon = styled(DefaultIcon) <IconProps>`
   color: ${(props) => props.typeoption == TypesOptions.DEPOSIT ? props.theme.colors.green500 : props.theme.colors.red500};
`