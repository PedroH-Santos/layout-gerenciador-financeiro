import Menu from "@/components/menu";
import Screen from "@/components/screen";
import { Body, BoxButton, BoxTileAndActions, TextTitle } from "./styles";
import { DefaultButton, DefaultButtonLink, DefaultButtonReactLink } from "@/css/default";
import TableAccount from "@/components/table/account";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { ListAccounts } from "@/@types/Request/ListAccounts";
import { api, getApiClient } from "@/services/axios";
import { Account } from "@/@types/Account";
import { useState } from "react";
import ModalSuccess from "@/components/modal/statusAccountsRegister";
import ModalStatusAccountsRegister from "@/components/modal/statusAccountsRegister";
import ModalCreateAccountsRegisters from "@/components/modal/createAccountsRegisters";


type AccountListProps = {
    accountsInitial: Account[],
    groupId: string,
}
type ParamsRoute = {
    groupId: string,
}
export default function AccountList({ accountsInitial, groupId }: AccountListProps) {
    const [accounts, setAccounts] = useState<Account[]>(accountsInitial);





    return (
        <Screen>
            <Menu />
            <Body>
                <BoxTileAndActions>
                    <TextTitle> Grupo do churrsaco </TextTitle>
                    <BoxButton>
                        <ModalStatusAccountsRegister groupId={groupId}/>
                        <ModalCreateAccountsRegisters groupId={groupId} />
                        <DefaultButtonReactLink href={`/account/insert/${groupId}`}>
                            Cadastrar Conta
                        </DefaultButtonReactLink>
                    </BoxButton>
                </BoxTileAndActions>
                <TableAccount accounts={accounts} onChangeAccounts={setAccounts} />
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
    const { groupId } = context.params as unknown as ParamsRoute;
    const apiBack = getApiClient(context);
    const accounts = await apiBack.get<ListAccounts>(`/accounts/${groupId}`).then((res) => {
        return res.data.accounts;
    });

    return {
        props: {
            accountsInitial: accounts, 
            groupId,
        }
    
    }
}