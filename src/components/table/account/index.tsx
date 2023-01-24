import { Container, Button, FilterIcon, Header, Title, Table, Th, THead, TBody, RowTableTypes, Td, TrBody, Icon, BoxIcons, MoreLoadingButton } from "./styles";
import { faFilter, faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


export default function TableAccount() {
    return (
        <Container>
            <Header>
                <Title>Contas</Title>
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
                        <Th> Data de Vencimento </Th>
                        <Th> Parcela </Th>
                        <Th> Tipo </Th>
                        <Th> Status </Th>

                    </tr>
                </THead>
                <TBody >
                    <TrBody type={RowTableTypes.PAY}>
                        <Td> Pedro </Td>
                        <Td> R$ 90,00</Td>
                        <Td> 19/01/2002 </Td>
                        <Td> 1/12 </Td>
                        <Td> Parcelada </Td>
                        <Td> Paga </Td>

                    </TrBody>
                    <TrBody type={RowTableTypes.LATE}>
                        <Td> Pedro </Td>
                        <Td> R$ 90,00</Td>
                        <Td> 19/01/2002 </Td>
                        <Td> 1/12 </Td>
                        <Td> Recorrente </Td>
                        <Td> Paga </Td>

                    </TrBody>
                    <TrBody type={RowTableTypes.WAITING}>
                        <Td> Pedro </Td>
                        <Td> R$ 90,00</Td>
                        <Td> 19/01/2002 </Td>
                        <Td> 1/12 </Td>
                        <Td> Parcelada </Td>
                        <Td> Aguardando Pagamento </Td>
                    </TrBody>
                </TBody>
            </Table>
            <MoreLoadingButton> Ver mais </MoreLoadingButton>
        </Container>
    )
}