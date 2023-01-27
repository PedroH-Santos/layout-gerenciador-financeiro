import { faReceipt, faRightFromBracket, faUserGroup } from "@fortawesome/free-solid-svg-icons";
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
                <Item icon={faUserGroup} text="Grupos"/>
                <Item icon={faReceipt} text="Contas" />
                <Item icon={faRightFromBracket} text="Sair" />
            </BoxItems>
        </Container>
    )
}