import { faCirclePlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Body, BoxButton, BoxHeader, BoxTileAndActions, BoxWallet, Icons, IconsType, TextTitle, TextWallet } from "./styles";
import TableRegister from "@/components/table/register";
import Menu from "@/components/menu";
import Screen from "@/components/screen";
import TableAccount from "@/components/table/account";
import ModalRegisterInsert from "@/components/modal/insert/register";
import { DefaultButton, DefaultButtonLink, DefaultIcon } from "@/css/default";
import ModalDelete from "@/components/modal/delete/icon";
import ModalDeleteButton from "@/components/modal/delete/button";
import TableParticipants from "@/components/table/participants";





export default function GroupDetail() {
    return (
        <>
            <Screen>
                <Menu />
                <Body>
                    <BoxHeader>
                        <BoxWallet>
                            <Icons wallet={IconsType.POSITIVE} icon={faCirclePlus} />
                            <TextWallet>R$ 1990,55</TextWallet>
                        </BoxWallet>
                    </BoxHeader>
                    <BoxTileAndActions>
                        <TextTitle> Grupo do churrsaco </TextTitle>
                        <BoxButton>
                            <ModalRegisterInsert />
                            <DefaultButtonLink href="">
                                <DefaultIcon icon={faPenToSquare} />
                                Editar
                            </DefaultButtonLink>
                            <ModalDeleteButton name="delete" />
                        </BoxButton>
                    </BoxTileAndActions>
                    <TableRegister />
                    <TableAccount />
                    <TableParticipants />
                </Body>
            </Screen>

        </>
    )

}