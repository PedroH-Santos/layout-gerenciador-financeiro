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



type GroupDetailProps = {
    registersInitial: Register[],
    groupId: string;

}

type ParamsRoute = {
    groupId: string,
}


export default function GroupDetail({ registersInitial, groupId }: GroupDetailProps) {
    const [registers,useRegisters] = useState<Register[]>(registersInitial);
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
                            <ModalRegisterInsert registers={registers} onChangeRegister={useRegisters} groupId={groupId} />
                            <DefaultButtonLink href="">
                                <DefaultIcon icon={faPenToSquare} />
                                Editar
                            </DefaultButtonLink>
                            <ModalDeleteButton name="delete" />
                        </BoxButton>
                    </BoxTileAndActions>
                    <TableRegister registers={registers} onChangeRegisters={useRegisters}/>
                    <TableAccount accounts={[]} onChangeAccounts={() => {}}/>
                    <TableParticipants />
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

    return {
        props: { 
            registersInitial: registers,
            groupId,
         },
    }
}