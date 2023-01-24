import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { Icon, DialogTitle, DialogContent, DialogOverlay, DeleteButton, BackButton, ButtonContainer } from "./styles";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


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
            <Trigger>
                <Icon icon={faPenToSquare} />
            </Trigger>
            <Portal>
                <DialogOverlay />
                <DialogContent>
                    <DialogTitle > Deseja excluir {name} permanentemente? </DialogTitle>
                    <ButtonContainer>
                        <DeleteButton> Excluir </DeleteButton>
                        <BackButton onClick={onBack}> Voltar </BackButton> 
                    </ButtonContainer>
                    
                </DialogContent>
            </Portal>
        </Root>
    );
};
