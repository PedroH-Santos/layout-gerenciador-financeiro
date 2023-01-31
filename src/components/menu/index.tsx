import { faHouse, faReceipt, faRightFromBracket, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Item from "./item";
import { BoxIcon, BoxItems, Container} from "./styles";
import ModalConfiguration from "../modal/configuration";




export default function Menu() {

    return (
        <Container>
            <BoxIcon>
                <ModalConfiguration name="Pedro" />
            </BoxIcon>
            <BoxItems>
                <Item icon={faHouse} text="Página Inicial" link="/home" />
                <Item icon={faUserGroup} text="Grupos" link="/group/list"/>
                <Item icon={faReceipt} text="Contas" link="/account/list"/>
                <Item icon={faRightFromBracket} text="Sair" link=""/>
            </BoxItems>
        </Container>
    )
}