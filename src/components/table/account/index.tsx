import ModalAccountFilter from "@/components/modal/filter/account";
import { Container, Button, FilterIcon, Header, Title, Table, Th, THead, TBody, Td, TrBody, Icon, BoxIcons, MoreLoadingButton } from "./styles";
import { faFilter, faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Account } from "@/@types/Account";
import moment from "moment";
import ModalDelete from "@/components/modal/delete/icon";
import { ReturnAccount } from "@/@types/Request/ReturnAccount";
import { api } from "@/services/axios";
import ModalAccountEdit from "@/components/modal/edit/account";


type TableAccountProps = {
    accounts: Account[];
    onChangeAccounts: Function;
    groupId: string;
}





export default function TableAccount({ accounts, onChangeAccounts, groupId }: TableAccountProps) {

    async function onDeleteAccount(id: string) {
        try {
            const accountDeleted = await api.delete<ReturnAccount>(`accounts/${id}`).then((res) => {
                return res.data.account;
            })
            const filterRegister = accounts.filter((account) => account.id !== accountDeleted.id);
            onChangeAccounts(filterRegister);
        }catch(err: any) {
            throw err;
        }
    }

    return (
        <Container>
            <Header>
                <Title>Contas</Title>
                <ModalAccountFilter onChangeAccounts={onChangeAccounts} groupId={groupId}/>
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
                        <Th> </Th>

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
                                <Td> 
                                    <BoxIcons>
                                        <ModalDelete name={account.name} onDeleteCallBack={onDeleteAccount} idDelete={account.id} />
                                        <ModalAccountEdit currentAccount={account} onChangeAccount={onChangeAccounts} accounts={accounts}/> 
                                    </BoxIcons>

                                </Td>
                            </TrBody>
                        )
                    })}
                </TBody>
            </Table>
            <MoreLoadingButton> Ver mais </MoreLoadingButton>
        </Container>
    )
}