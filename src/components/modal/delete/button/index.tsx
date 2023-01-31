import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { DialogContent, DeleteButton, BackButton, ButtonContainer, DialogTrigger } from "./styles";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseOverlay, BaseTrigger, BaseTitle } from "../../base/styles";
import { DefaultButtonLink, DefaultIcon } from "@/css/default";


type ModalDeleteProps = {
    name: string;
}

export default function ModalDeleteButton({ name }: ModalDeleteProps) {
    const [open, setOpen] = useState(false);


    function onBack() {
        setOpen(false);
    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <DefaultButtonLink href="">
                    <DefaultIcon icon={faTrashAlt} />
                    Excluir
                </DefaultButtonLink>
            </DialogTrigger>
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
