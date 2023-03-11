import Menu from "@/components/menu";
import Screen from "@/components/screen";
import { Body, BoxButton, BoxTileAndActions, TextTitle } from "./styles";
import { DefaultButton, DefaultButtonLink, DefaultButtonReactLink } from "@/css/default";
import TableAccount from "@/components/table/account";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { ListAccounts } from "@/@types/Request/ListAccounts";
import { getApiClient } from "@/services/axios";
import { Account } from "@/@types/Account";
import { useState } from "react";


type AccountListProps = {
    accountsInitial: Account[],
}
export default function AccountList({ accountsInitial }: AccountListProps) {
    const [accounts, setAccounts] = useState<Account[]>(accountsInitial);
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
                        <DefaultButtonReactLink href={"/account/insert"}>
                            Cadastrar Conta
                        </DefaultButtonReactLink>
                    </BoxButton>
                </BoxTileAndActions>
                <TableAccount accounts={accounts} onChangeAccounts={setAccounts}/>
            </Body>
        </Screen>
    )

}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { 'managerFinancial.token': token } = parseCookies(context);
    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    const apiBack = getApiClient(context);
    const accounts = await apiBack.get<ListAccounts>('/accounts').then((res) => {
        return res.data.accounts;
    });

    console.log(accounts);
    return {
        props: { accountsInitial: accounts }
    }
}