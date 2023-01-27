import ModalDelete from "@/components/modal/delete/icon";
import { Container, Header, Title, Table, Th, THead, TBody, RowTableTypes, Td, TrBody, Icon, BoxIcons, MoreLoadingButton } from "./styles";
import { faFilter, faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ModalRegisterFilter from "@/components/modal/filter/register";


export default function TableRegister() {
    return (
        <Container>
            <Header>
                <Title>Registros</Title>
                <ModalRegisterFilter />
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
                    <TrBody type={RowTableTypes.DEPOSIT}>
                        <Td> Pedro </Td>
                        <Td> R$ 90,00</Td>
                        <Td> 19/01/2002 </Td>
                        <Td>
                            <BoxIcons>
                                <Icon icon={faPenToSquare} />
                                <ModalDelete name="Pedro"/>
                            </BoxIcons>
                        </Td>
                    </TrBody>
                    <TrBody type={RowTableTypes.WITHDRAW}>
                        <Td> Pedro </Td>
                        <Td> R$ 90,00</Td>
                        <Td> 19/01/2002 </Td>
                        <Td>
                            <BoxIcons>
                                <Icon icon={faPenToSquare} />
                                <ModalDelete name="Pedro" />
                            </BoxIcons>
                        </Td>
                    </TrBody>
                </TBody>
            </Table>
            <MoreLoadingButton> Ver mais </MoreLoadingButton>
        </Container>
    )
}