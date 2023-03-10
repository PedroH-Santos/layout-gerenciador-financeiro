import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import {   DialogContent, DeleteButton, BackButton, ButtonContainer } from "./styles";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseOverlay, BaseTrigger, BaseTitle } from "../../base/styles";
import { DefaultIcon } from "@/css/default";


type ModalDeleteProps = {
    name: string;
}

export default function ModalDelete({ name }: ModalDeleteProps) {
    const [open, setOpen] = useState(false);


    function onBack() {
        setOpen(false);
    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <BaseTrigger>
                <DefaultIcon icon={faTrashAlt} />
            </BaseTrigger>
            <Portal>
                <BaseOverlay />
                <DialogContent>
                    <BaseTitle > Deseja excluir {name} permanentemente? </BaseTitle>
                    <ButtonContainer>
                        <DeleteButton> Excluir </DeleteButton>
                        <BackButton onClick={onBack}> Voltar </BackButton> 
                    </ButtonContainer>
                    
                </DialogContent>
            </Portal>
        </Root>
    );
};
