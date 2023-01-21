import { faReceipt, faRightFromBracket, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Item from "./item";
import { BoxIcon, BoxItems, Container, UserIcon, UserName } from "./styles";




export default function Menu() {

    return (
        <Container>
            <BoxIcon>
                <UserIcon />
                <UserName> Pedro </UserName>
            </BoxIcon>
            <BoxItems>
                <Item icon={faUserGroup} text="Grupos"/>
                <Item icon={faReceipt} text="Contas" />
                <Item icon={faRightFromBracket} text="Sair" />
            </BoxItems>
        </Container>
    )
}