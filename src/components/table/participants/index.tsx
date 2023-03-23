import ModalDelete from "@/components/modal/delete/icon";
import { Container, Header, Title, Table, Th, THead, TBody,  Td, TrBody, Icon, BoxIcons, MoreLoadingButton, IconTypes } from "./styles";
import { faCircleMinus, faCirclePlus, faFilter, faPenToSquare, faRocket, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ModalRegisterFilter from "@/components/modal/filter/register";
import { User } from "@/@types/User";
import { Group } from "@/@types/Group";
import { Members } from "@/@types/Members";


type TableParticipantsProps = {
    members: Members[];
    group: Group;
}


export default function TableParticipants({ members, group }: TableParticipantsProps) {
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
                    {members.map(member => {

                        return (
                            <TrBody key={member.id}>
                                <Td> {member.user.name} </Td>
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
                                {group.creatorId == member.user.id && (
                                    
                                        <BoxIcons>
                                            <Icon icon={faRocket} icontype={IconTypes.OWN} />
                                            Dono
                                        </BoxIcons>
                                   
                                )} 
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