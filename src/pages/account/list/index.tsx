import Menu from "@/components/menu";
import Screen from "@/components/screen";
import { Body, BoxButton, BoxTileAndActions, TextTitle } from "./styles";
import { DefaultButton, DefaultButtonLink } from "@/css/default";
import TableAccount from "@/components/table/account";


export default function AccountList() {
    return (
        <Screen>
            <Menu />
            <Body>
                <BoxTileAndActions>
                    <TextTitle> Grupo do churrsaco </TextTitle>
                    <BoxButton>
                        <DefaultButton>
                            Atualizar Status
                        </DefaultButton>
                        <DefaultButton>
                            Criar Contas do Mês
                        </DefaultButton>
                        <DefaultButtonLink>
                            Cadastrar Conta
                        </DefaultButtonLink>
                    </BoxButton>
                </BoxTileAndActions>
                <TableAccount />
            </Body>
        </Screen>
    )

}