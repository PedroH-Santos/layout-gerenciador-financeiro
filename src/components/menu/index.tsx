import { faHouse, faReceipt, faRightFromBracket, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Item from "./item";
import { BoxIcon, BoxItems, Container} from "./styles";
import ModalConfiguration from "../modal/configuration";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import Action from "./action";




export default function Menu() {  
    
    const { signOut } = useContext(AuthContext);


    
    return (
        <Container>
            <BoxIcon>
                <ModalConfiguration />
            </BoxIcon>
            <BoxItems>
                <Item icon={faUserGroup} text="Grupos" link="/group/list"/>
                <Action icon={faRightFromBracket} text="Sair" action={signOut} />
            </BoxItems>
        </Container>
    )
}