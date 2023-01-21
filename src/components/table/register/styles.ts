import { DefaultButton } from "@/css/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";


export enum RowTableTypes {
    "DEPOSIT",
    "WITHDRAW"
}

type RowTableProps =  {
    type: RowTableTypes
}

export const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.brown300};
    width: 100%;
    height: auto;
    padding: 2rem;

`

export const Header = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
    width: 100%;
`

export const Title = styled.h3`
    color: ${(props) => props.theme.colors.white500};

`

export const Button = styled(DefaultButton)`
    padding: 1rem 1.5rem;
`


export const FilterIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.white500};
    width: 1.2rem;
    height: 1.2rem;
    margin-right:0.5rem;
`   


export const Table = styled.table`


`

export const TrHead = styled.tr`
    background-color: ${( props ) => props.theme.colors.brown500};

`

export const TrBody = styled.tr<RowTableProps>`
    background-color: ${(props) => props.type == RowTableTypes.DEPOSIT ? props.theme.colors.green500 : props.theme.colors.red500 };

`
export const Th = styled.th`
    color: ${(props) => props.theme.colors.white500};
`
export const Td = styled.td`
    color: ${(props) => props.theme.colors.white500};
`

export const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.white500};
    width: 1.2rem;
    height: 1.2rem;
`

export const MoreLoadingButton = styled(DefaultButton)``
