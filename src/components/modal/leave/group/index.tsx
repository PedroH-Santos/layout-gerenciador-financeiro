import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import {   DialogContent, DeleteButton, BackButton, ButtonContainer } from "./styles";
import { faRightFromBracket, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseOverlay, BaseTrigger, BaseTitle } from "../../base/styles";
import { DefaultIcon } from "@/css/default";


type ModalLeaveProps = {
    name: string;
}

export default function ModalGroupLeave({ name }: ModalLeaveProps) {
    const [open, setOpen] = useState(false);


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
                        <DeleteButton> Sair </DeleteButton>
                        <BackButton onClick={onBack}> Voltar </BackButton> 
                    </ButtonContainer>
                    
                </DialogContent>
            </Portal>
        </Root>
    );
};
