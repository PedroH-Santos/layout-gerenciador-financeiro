import Menu from "@/components/menu";
import Screen from "@/components/screen";
import { Body, BoxForm, BoxTile, TextTitle } from "./styles";
import AccountForm from "@/components/form/account";
import { parseCookies } from "nookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type AccountInsertProps = {
    groupId: string,
}


type ParamsRoute = {
    groupId: string,
}
export default function AccountInsert({ groupId }: AccountInsertProps){
    return (
        <Screen>
            <Menu />
            <Body>
                <BoxTile>
                    <TextTitle> Cadastro de Contas </TextTitle>
                </BoxTile>  
                <BoxForm>
                    <AccountForm groupId={groupId}/>
                </BoxForm>
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
    return {
        props: {
            groupId,
        }

    }
}