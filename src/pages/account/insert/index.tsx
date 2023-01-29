import Menu from "@/components/menu";
import Screen from "@/components/screen";
import { Body, BoxForm, BoxTile, TextTitle } from "./styles";
import AccountForm from "@/components/form/account";


export default function AccountInsert(){
    return (
        <Screen>
            <Menu />
            <Body>
                <BoxTile>
                    <TextTitle> Cadastro de Contas </TextTitle>
                </BoxTile>  
                <BoxForm>
                    <AccountForm/>
                </BoxForm>
                </Body>
        </Screen>
    )

}