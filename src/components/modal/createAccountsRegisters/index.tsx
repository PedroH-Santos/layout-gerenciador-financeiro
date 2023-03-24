import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import {   DialogContent, DeleteButton, BackButton, ButtonContainer } from "./styles";
import { faRightFromBracket, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { DefaultButton, DefaultIcon, DefaultButtonLink } from "@/css/default";
import { Group } from "@/@types/Group";
import { api } from "@/services/axios";
import { OutGroup } from "@/@types/Request/OutGroup";
import { BaseTrigger, BaseOverlay, BaseTitle } from "../base/styles";


type ModalCreateAccountsRegistersProps = {
    groupId: string

}

export default function ModalCreateAccountsRegisters({ groupId }: ModalCreateAccountsRegistersProps) {
    const [open, setOpen] = useState(false);


    async function onCreateRegistersAccounts() {
        await api.post(`/accounts/registers/create/${groupId}`);

    }

    function onBack() {
        setOpen(false);
    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <BaseTrigger onClick={onCreateRegistersAccounts}>
                <DefaultButtonLink onClick={onCreateRegistersAccounts}>
                    Criar Contas do Mês
                </DefaultButtonLink>
            </BaseTrigger>
            <Portal>
                <BaseOverlay />
                <DialogContent>
                    <BaseTitle > Todos os registros de contas desse mês foram criados com sucesso </BaseTitle>
                    <ButtonContainer>
                        <BackButton onClick={onBack}> Voltar </BackButton> 
                    </ButtonContainer>
                    
                </DialogContent>
            </Portal>
        </Root>
    );
};
