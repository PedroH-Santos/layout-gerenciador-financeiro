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
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { api, getApiClient } from "@/services/axios";
import { Register } from "@/@types/Register";
import { ListRegisters } from "@/@types/Request/ListRegisters";
import { useState } from "react";
import { ReturnAccountsRegisters } from "@/@types/Request/ReturnAccountsRegisters";
import { AccountRegister } from "@/@types/AccountRegister";
import TableAccountRegister from "@/components/table/accountRegister";
import { ReturnMembers } from "@/@types/Request/ReturnMembers";
import { User } from "@/@types/User";
import { ReturnGroup } from "@/@types/Request/ReturnGroup";
import { Group } from "@/@types/Group";
import { Members } from "@/@types/Members";



type GroupDetailProps = {
    registersInitial: Register[],
    accountsRegistersInitial: AccountRegister[],
    membersInitial: Members[],
    groupInitial: Group;

}

type ParamsRoute = {
    groupId: string,
}


export default function GroupDetail({ registersInitial, accountsRegistersInitial, membersInitial, groupInitial }: GroupDetailProps) {
    const [registers,useRegisters] = useState<Register[]>(registersInitial);
    const [accountsRegisters, useAccountsRegisters] = useState<AccountRegister[]>(accountsRegistersInitial);
    const [members, UseMembers] = useState<Members[]>(membersInitial);
    const [group, useGroup] = useState<Group>(groupInitial);
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
                            <ModalRegisterInsert registers={registers} onChangeRegister={useRegisters} groupId={group.id} />
                            <DefaultButtonLink href="">
                                <DefaultIcon icon={faPenToSquare} />
                                Editar
                            </DefaultButtonLink>
                            <ModalDeleteButton name="delete" />
                        </BoxButton>
                    </BoxTileAndActions>
                    <TableRegister registers={registers} onChangeRegisters={useRegisters}/>
                    <TableAccountRegister accountsRegisters={accountsRegisters} />
                    <TableParticipants members={members} group={group}/>
                </Body>
            </Screen>

        </>
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
    const { groupId } = context.params as unknown as ParamsRoute;
    const registers = await apiBack.get<ListRegisters>(`/registers/${groupId}`).then((res) => {
        return res.data.registers;
    })

    const accountsRegisters = await apiBack.get<ReturnAccountsRegisters>(`/accounts/registers/${groupId}`).then((res) => {
        return res.data.registers;
    })

    const members = await apiBack.get<ReturnMembers>(`/groups/members/${groupId}`).then((res) => {
        return res.data.members;
    })

    const group = await apiBack.get<ReturnGroup>(`/groups/one/${groupId}`).then((res => {
        return res.data.group;
    }))

    return {
        props: { 
            registersInitial: registers,
            accountsRegistersInitial: accountsRegisters,
            membersInitial: members,
            groupInitial: group,
         },
    }
}