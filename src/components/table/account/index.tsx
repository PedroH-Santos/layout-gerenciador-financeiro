import ModalAccountFilter from "@/components/modal/filter/account";
import { Container, Button, FilterIcon, Header, Title, Table, Th, THead, TBody, Td, TrBody, Icon, BoxIcons, MoreLoadingButton } from "./styles";
import { faFilter, faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Account } from "@/@types/Account";
import moment from "moment";


type TableAccountProps = {
    accounts: Account[];
    onChangeAccounts: Function;
}


export default function TableAccount({ accounts, onChangeAccounts}: TableAccountProps) {
    return (
        <Container>
            <Header>
                <Title>Contas</Title>
                <ModalAccountFilter onChangeAccounts={onChangeAccounts}/>
            </Header>
            <Table>
                <THead>
                    <tr>
                        <Th> Nome </Th>
                        <Th> Preço </Th>
                        <Th> Dia de Vencimento </Th>
                        <Th> Parcelas </Th>
                        <Th> Tipo </Th>
                        <Th> Status </Th>

                    </tr>
                </THead>
                <TBody >
                    {accounts.map(account => {
                        return (
                            <TrBody type={account.status} key={account.id}>
                                <Td> {account.name} </Td>
                                <Td> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(account.price)}</Td>
                                <Td> {account.dayDueDate} </Td>
                                <Td> {account.installments} </Td>
                                <Td> {account.type} </Td>
                                <Td> {account.status} </Td>

                            </TrBody>
                        )
                    })}
                </TBody>
            </Table>
            <MoreLoadingButton> Ver mais </MoreLoadingButton>
        </Container>
    )
}