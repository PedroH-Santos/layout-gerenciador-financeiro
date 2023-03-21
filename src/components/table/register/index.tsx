import ModalDelete from "@/components/modal/delete/icon";
import { Container, Header, Title, Table, Th, THead, TBody, Td, TrBody, Icon, BoxIcons, MoreLoadingButton } from "./styles";
import { faFilter, faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ModalRegisterFilter from "@/components/modal/filter/register";
import { Register } from "@/@types/Register";
import moment from "moment";
import { api } from "@/services/axios";
import { ReturnRegister } from "@/@types/Request/ReturnRegister";
import ModalRegisterEdit from "@/components/modal/edit/register";


export type TableRegisterProps = {
    registers: Register[],
    onChangeRegisters: Function,
}

export default function TableRegister({ registers, onChangeRegisters }: TableRegisterProps) {
    
    
    async function onDeleteRegister(id: string) {
        const registerDelete = await api.delete<ReturnRegister>(`registers/${id}`).then((res) => {
            return res.data.register;
        })
        const filterRegister = registers.filter((register) => register.id !== registerDelete.id);
        onChangeRegisters(filterRegister);
    }
    return (
        <Container>
            <Header>
                <Title>Registros</Title>
                <ModalRegisterFilter onChangeRegisters={onChangeRegisters} />
            </Header>
            <Table>
                <THead>
                    <tr>
                        <Th> Nome </Th>
                        <Th> Preço </Th>
                        <Th> Data de Lançamento </Th>
                        <Th>  </Th>
                    </tr>
                </THead>
                <TBody >
                    {registers.map((register) => {
                        return (
                            <TrBody type={register.status} key={register.id}>
                                <Td> {register.name} </Td>
                                <Td> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(register.price)}</Td>
                                <Td> {moment(register.createdAt).format('DD/MM/yyyy')} </Td>
                                <Td>
                                    <BoxIcons>
                                        <ModalRegisterEdit registers={registers} onChangeRegister={onChangeRegisters} currentRegister={register}/>
                                        <ModalDelete name={register.name} onDeleteCallBack={onDeleteRegister} idDelete={register.id}/>
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