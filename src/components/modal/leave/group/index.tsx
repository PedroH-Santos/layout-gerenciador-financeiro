import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import {   DialogContent, DeleteButton, BackButton, ButtonContainer } from "./styles";
import { faRightFromBracket, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseOverlay, BaseTrigger, BaseTitle } from "../../base/styles";
import { DefaultIcon, DefaultMessageApi } from "@/css/default";
import { Group } from "@/@types/Group";
import { api } from "@/services/axios";
import { OutGroup } from "@/@types/Request/OutGroup";
import { StatusMessageApi, useMessageApi } from "@/hooks/useMessageApi";


type ModalLeaveProps = {
    name: string;
    code: string;
    groups: Group[];
    onChangeGroups: Function;
}

export default function ModalGroupLeave({ name, code, groups, onChangeGroups}: ModalLeaveProps) {
    const [open, setOpen] = useState(false);
    const { messageApi, insertNewMessage, deleteNewMessage } = useMessageApi();


    async function onLeaveGroup() {
        
        try {
             await api.post<OutGroup>('/groups/members/out', {
                code: code,
            }).then((res) => {
                return res.data.group;
            });
            const newGroupsList = groups.filter(group => group.code !== code);
            onChangeGroups(newGroupsList);
            setOpen(false);
        } catch (err: any) {
            insertNewMessage(StatusMessageApi.ERROR, err.response.data.error);
        }

    }

    function onBack() {
        setOpen(false);
    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <BaseTrigger>
                <DefaultIcon icon={faRightFromBracket} />
            </BaseTrigger>
            <Portal>
                <BaseOverlay />
                <DialogContent>
                    <BaseTitle > Deseja sair do grupo {name} permanentemente? </BaseTitle>
                    <ButtonContainer>
                        <DeleteButton onClick={onLeaveGroup}> Sair </DeleteButton>
                        <BackButton onClick={onBack}> Voltar </BackButton> 
                    </ButtonContainer>
                    {messageApi && (
                        <ButtonContainer>
                            <DefaultMessageApi status={messageApi.status}>
                                {messageApi.message}
                            </DefaultMessageApi>
                        </ButtonContainer>
                    )}
                </DialogContent>
            </Portal>
        </Root>
    );
};
