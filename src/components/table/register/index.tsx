import { Container, Button, FilterIcon, Header, Title, Table, Th, THead, TBody, RowTableTypes, Td, TrBody, Icon, BoxIcons, MoreLoadingButton } from "./styles";
import { faFilter, faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


export default function TableRegister() {
    return (
        <Container>
            <Header>
                <Title>Registros</Title>
                <Button>
                    <FilterIcon icon={faFilter} />
                    Filtros
                </Button>
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
                                <Icon icon={faTrashAlt} />
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
                                <Icon icon={faTrashAlt} />
                            </BoxIcons>
                        </Td>
                    </TrBody>
                </TBody>
            </Table>
            <MoreLoadingButton> Ver mais </MoreLoadingButton>
        </Container>
    )
}