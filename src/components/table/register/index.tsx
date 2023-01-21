import { Container,Button, FilterIcon, Header, Title, Table, Th, TrHead, TrBody, RowTableTypes, Td } from "./styles";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


export default function TableRegister () {
    return (
        <Container>
            <Header>
                <Title>Registros</Title>
                <Button> 
                    <FilterIcon icon={faFilter}/>
                    Filtros
                </Button>
            </Header>
            <Table>
                <TrHead>
                    <Th> Nome </Th>
                    <Th> Preço </Th>
                    <Th> Data de Lançamento </Th>  
                </TrHead>
                <TrBody type={RowTableTypes.DEPOSIT}> 
                   <Td> Pedro </Td>
                   <Td> R$ 90,00</Td>
                   <Td> 19/01/2002 </Td>  
                </TrBody>
            </Table>
        </Container>
    )
}