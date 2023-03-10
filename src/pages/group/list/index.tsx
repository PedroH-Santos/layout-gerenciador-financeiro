import Menu from "@/components/menu";
import Screen from "@/components/screen";
import TableAccount from "@/components/table/account";
import ModalRegisterInsert from "@/components/modal/insert/register";
import ModalGroupFilter from "@/components/modal/in/group";
import ModalGroupIn from "@/components/modal/in/group";
import ModalGroupInsert from "@/components/modal/insert/group";
import { Body, BoxButton, BoxTileAndActions, TextTitle } from "./styles";
import TableGroups from "@/components/table/groups/indes";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { api, getApiClient } from "@/services/axios";
import { Group } from "@/@types/Group";
import { ListGroups } from "@/@types/Request/ListGroups";
import { useState } from "react";
import { parseCookies } from "nookies";


type GroupListProps = {
    groupsInitial: Group[],
}

export default function GroupList({ groupsInitial }: GroupListProps){
    const [groups,setGroups] = useState<Group[]>(groupsInitial);
    return (

        <Screen>
            <Menu />
            <Body>
                <BoxTileAndActions>
                    <TextTitle> Grupos </TextTitle>
                    <BoxButton>
                        <ModalGroupIn groups={groups} onChangeGroups={setGroups} />
                        <ModalGroupInsert groups={groups}  onChangeGroups={setGroups} />
                    </BoxButton>
                </BoxTileAndActions>
                <TableGroups groups={groups} onChangeGroups={setGroups} />
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
    const groups = await apiBack.get<ListGroups>('/groups').then((res) => { 
         return res.data.groups;;
    });
    
      
    return {
        props: { groupsInitial: groups}
    }
}