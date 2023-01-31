import ModalGroupFilter from "@/components/modal/filter/group";
import { BoxIcons, Container, DetailButton, Header, MoreLoadingButton, TBody, THead, Table, Td, Th, Title, TrBody } from "./styles";
import ModalGroupLeave from "@/components/modal/leave/group";
import { DefaultButtonReactLink, DefaultIcon } from "@/css/default";
import { faSearch } from "@fortawesome/free-solid-svg-icons";




export default function TableGroups() {
    return (
        <Container>
            <Header>
                <Title>Contas</Title>
                <ModalGroupFilter />
            </Header>
            <Table>
                <THead>
                    <tr>
                        <Th> Nome </Th>
                        <Th> Criador </Th>
                        <Th> Data de Admissão </Th>
                        <Th> Código </Th>
                        <Th> </Th>

                    </tr>
                </THead>
                <TBody >
                    <TrBody>
                        <Td> Pedro </Td>
                        <Td> Sabrina</Td>
                        <Td> 19/01/2002 </Td>
                        <Td> CBW27636 </Td>
                        <Td>
                            <BoxIcons>
                                <DetailButton href="/group/detail">
                                    <DefaultIcon icon={faSearch} />
                                </DetailButton>
                                <ModalGroupLeave name="Churrasco" />
                            </BoxIcons>

                        </Td>
                    </TrBody>
                    <TrBody>
                        <Td> Pedro </Td>
                        <Td> Sabrina</Td>
                        <Td> 19/01/2002 </Td>
                        <Td> CFV47349 </Td>
                        <Td>
                            <BoxIcons>
                                <DefaultIcon icon={faSearch} />
                                <ModalGroupLeave name="Churrasco" />
                            </BoxIcons>
                        </Td>
                    </TrBody>
                </TBody>
            </Table>
            <MoreLoadingButton> Ver mais </MoreLoadingButton>
        </Container>

    )

}