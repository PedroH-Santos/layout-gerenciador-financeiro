import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import {   DialogContent, DeleteButton, BackButton, ButtonContainer } from "./styles";
import { faRightFromBracket, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { DefaultButton, DefaultIcon, DefaultButtonLink } from "@/css/default";
import { Group } from "@/@types/Group";
import { api } from "@/services/axios";
import { OutGroup } from "@/@types/Request/OutGroup";
import { BaseTrigger, BaseOverlay, BaseTitle } from "../base/styles";


type ModalStatusAccountsRegisterProps = {

    groupId: string;
}

export default function ModalStatusAccountsRegister({ groupId }: ModalStatusAccountsRegisterProps) {
    const [open, setOpen] = useState(false);


    async function onUpdateStatusRegistersAccounts() {
        await api.put(`/accounts/registers/status/${groupId}`);

    }

    function onBack() {
        setOpen(false);
    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <BaseTrigger>
                <DefaultButtonLink onClick={onUpdateStatusRegistersAccounts}>
                    Atualizar Status
                </DefaultButtonLink>
            </BaseTrigger>
            <Portal>
                <BaseOverlay />
                <DialogContent>
                    <BaseTitle > Todos os registros de contas desse mês teve seus status alterados </BaseTitle>
                    <ButtonContainer>
                        <BackButton onClick={onBack}> Voltar </BackButton> 
                    </ButtonContainer>
                    
                </DialogContent>
            </Portal>
        </Root>
    );
};
