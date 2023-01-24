import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Body, BoxButton, BoxHeader, BoxWallet, Icons, IconsType, InsertNewRegister, TextWallet } from "./styles";
import TableRegister from "@/components/table/register";
import Menu from "@/components/menu";
import Screen from "@/components/screen";
import TableAccount from "@/components/table/account";
import ModalDelete from "@/components/modal/delete";


/* 
Fazer validação do Icone
*/
export default function Home() {
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
                    <BoxButton>
                        <InsertNewRegister> Novo Registro </InsertNewRegister>
                    </BoxButton>
                    <TableRegister />
                    <TableAccount /> 
                    <ModalDelete name="Pedro"/>
                </Body>
            </Screen>

        </>
    )
}  