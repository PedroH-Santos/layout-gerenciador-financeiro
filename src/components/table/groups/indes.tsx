import ModalGroupFilter from "@/components/modal/filter/group";
import { BoxIcons, Container, DetailButton, Header, MoreLoadingButton, TBody, THead, Table, Td, Th, Title, TrBody } from "./styles";
import ModalGroupLeave from "@/components/modal/leave/group";
import { DefaultButtonReactLink, DefaultIcon } from "@/css/default";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Group } from "@/@types/Group";


type TableGroupsProps = {
    groups: Group[],
    onChangeGroups: Function,
}





export default function TableGroups({ groups, onChangeGroups }: TableGroupsProps) {
    return (
        <Container>
            <Header>
                <ModalGroupFilter onChangeGroups={onChangeGroups} />
            </Header>
            <Table>
                <THead>
                    <tr>
                        <Th> Nome </Th>
                        <Th> Criador </Th>
                        <Th> Data de Cadastro </Th>
                        <Th> Código </Th>
                        <Th> </Th>

                    </tr>
                </THead>
                <TBody >
                    {groups?.map(group => {
                        return (
                            <TrBody key={group.id}>
                                <Td> {group.name} </Td>
                                <Td> {group.creator.name} </Td>
                                <Td> {moment(group.createdAt).format('DD/MM/yyyy')}</Td>
                                <Td> {group.code}  </Td>
                                <Td>
                                    <BoxIcons>
                                        <DetailButton href="/group/detail">
                                            <DefaultIcon icon={faSearch} />
                                        </DetailButton>
                                        <ModalGroupLeave name={group.name} code={group.code} groups={groups} onChangeGroups={onChangeGroups} />
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