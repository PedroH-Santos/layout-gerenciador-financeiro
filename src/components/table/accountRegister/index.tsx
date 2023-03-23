import ModalAccountFilter from "@/components/modal/filter/account";
import { Container, Button, FilterIcon, Header, Title, Table, Th, THead, TBody, Td, TrBody, Icon, BoxIcons, MoreLoadingButton } from "./styles";
import { faFilter, faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Account } from "@/@types/Account";
import moment from "moment";
import { AccountRegister } from "@/@types/AccountRegister";


type TableAccountRegisterProps = {
    accountsRegisters: AccountRegister[];
}


export default function TableAccountRegister({ accountsRegisters }: TableAccountRegisterProps) {
    return (
        <Container>
            <Header>
                <Title>Registro de Contas</Title>
            </Header>
            <Table>
                <THead>
                    <tr>
                        <Th> Nome da Conta </Th>
                        <Th> Preço </Th>
                        <Th> Dia de Vencimento </Th>
                        <Th> Status </Th>

                    </tr>
                </THead>
                <TBody >
                    {accountsRegisters.map(register => {
                        return (
                            <TrBody type={register.status} key={register.id}>
                                <Td> {register.accounts.name} </Td>
                                <Td> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(register.price)}</Td>
                                <Td> {moment(register.dueDate).format('DD/MM/yyyy')}</Td>
                                <Td> {register.status} </Td>

                            </TrBody>
                        )
                    })}
                </TBody>
            </Table>
            <MoreLoadingButton> Ver mais </MoreLoadingButton>
        </Container>
    )
}