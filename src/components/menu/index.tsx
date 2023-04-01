import { faHouse, faReceipt, faRightFromBracket, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Item from "./item";
import { BoxIcon, BoxItems, Container} from "./styles";
import ModalConfiguration from "../modal/configuration";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";




export default function Menu() {    
    return (
        <Container>
            <BoxIcon>
                <ModalConfiguration />
            </BoxIcon>
            <BoxItems>
                <Item icon={faUserGroup} text="Grupos" link="/group/list"/>
                <Item icon={faRightFromBracket} text="Sair" link=""/>
            </BoxItems>
        </Container>
    )
}