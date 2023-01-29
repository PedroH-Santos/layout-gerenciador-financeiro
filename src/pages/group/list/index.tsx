import Menu from "@/components/menu";
import Screen from "@/components/screen";
import TableAccount from "@/components/table/account";
import ModalRegisterInsert from "@/components/modal/insert/register";
import ModalGroupFilter from "@/components/modal/in/group";
import ModalGroupIn from "@/components/modal/in/group";
import ModalGroupInsert from "@/components/modal/insert/group";
import { Body, BoxButton, BoxTileAndActions, TextTitle } from "./styles";
import TableGroups from "@/components/table/groups/indes";



export default function GroupList(){
    return (

        <Screen>
            <Menu />
            <Body>
                <BoxTileAndActions>
                    <TextTitle> Grupo do churrsaco </TextTitle>
                    <BoxButton>
                        <ModalGroupIn />
                        <ModalGroupInsert />
                    </BoxButton>
                </BoxTileAndActions>
                <TableGroups />
            </Body>
        </Screen>
    )

}