import { DefaultButton } from "@/css/default";
import { StatusRegister } from "@/enum/StatusRegister";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";




type RowTableProps = {
    type: StatusRegister
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
    margin-top: 2rem;

` 

export const Header = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
    width: 100%;
`

export const Title = styled.h1`
    color: ${(props) => props.theme.colors.white500};

`

export const Table = styled.table`
    width: 100%;
    padding: 2rem;
    text-align: center;
    border-collapse: separate;
    border-spacing: 0 1rem;
`
export const TBody = styled.tbody`
    
`

export const TrBody = styled.tr<RowTableProps>`
    background-color: ${(props) => props.type == StatusRegister.DEPOSIT ? props.theme.colors.green500 : props.theme.colors.red500};
    margin-bottom: 1rem;  
    width: 100%;
`
export const THead = styled.thead`
   background-color: ${(props) => props.theme.colors.brown600};
   th {
    padding: 1.5rem;
   }

`


export const Th = styled.th`
    color: ${(props) => props.theme.colors.white500};
`
export const Td = styled.td`
    color: ${(props) => props.theme.colors.white500};
    padding: 1.5rem;      
`

export const BoxIcons = styled.div`
    display: flex;
    gap: 0.8rem;
`

export const Icon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.colors.white500};
    width: 1.2rem;
    height: 1.2rem;

    &:hover {
        cursor: pointer;
    }
`

export const MoreLoadingButton = styled(DefaultButton)``
