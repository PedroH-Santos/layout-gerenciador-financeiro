import ModalDelete from "@/components/modal/delete/icon";
import { Container, Header, Title, Table, Th, THead, TBody,  Td, TrBody, Icon, BoxIcons, MoreLoadingButton, IconTypes } from "./styles";
import { faCircleMinus, faCirclePlus, faFilter, faPenToSquare, faRocket, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ModalRegisterFilter from "@/components/modal/filter/register";


export default function TableParticipants() {
    return (
        <Container>
            <Header>
                <Title>Participantes</Title>
            </Header>
            <Table>
                <THead>
                    <tr>
                        <Th>  </Th>
                        <Th>  </Th>
                        <Th>  </Th>
                        <Th>  </Th>
                    </tr>
                </THead>
                <TBody >
                    <TrBody >
                        <Td> Pedro </Td>
                        <Td> 
                            <BoxIcons>
                                <Icon icon={faCirclePlus} icontype={IconTypes.POSITIVE} />
                                R$ 200
                            </BoxIcons>
                        </Td>
                        <Td>
                            <BoxIcons>
                                <Icon icon={faCircleMinus} icontype={IconTypes.NEGATIVE} />
                                R$ 200
                            </BoxIcons>
                        </Td>
                        <Td>
                        </Td>
                    </TrBody>
                    <TrBody >
                        <Td> Pedro </Td>
                        <Td>
                            <BoxIcons>
                                <Icon icon={faCirclePlus} icontype={IconTypes.POSITIVE} />
                                R$ 200
                            </BoxIcons>
                        </Td>
                        <Td>
                            <BoxIcons>
                                <Icon icon={faCircleMinus} icontype={IconTypes.NEGATIVE} />
                                R$ 200
                            </BoxIcons>
                        </Td>
                        <Td>
                            <BoxIcons>
                                <Icon icon={faRocket} icontype={IconTypes.OWN} />
                                Dono
                            </BoxIcons>
                        </Td>
                    </TrBody>
                </TBody>
            </Table>
            <MoreLoadingButton> Ver mais </MoreLoadingButton>
        </Container>
    )
}