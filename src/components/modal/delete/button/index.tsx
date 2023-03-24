import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { DialogContent, DeleteButton, BackButton, ButtonContainer, DialogTrigger } from "./styles";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseOverlay, BaseTrigger, BaseTitle } from "../../base/styles";
import { DefaultButtonLink, DefaultIcon } from "@/css/default";
import { Router, useRouter } from "next/router";


type ModalDeleteProps = {
    name: string;
    onDeleteCallBack: Function;
    idDelete: string;
}

export default function ModalDeleteButton({ name, onDeleteCallBack, idDelete }: ModalDeleteProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    function onBack() {
        setOpen(false);
    }
    function onDelete() {
        onDeleteCallBack(idDelete);
        router.push("/group/list");
    }
    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <DefaultButtonLink>
                    <DefaultIcon icon={faTrashAlt} />
                    Excluir
                </DefaultButtonLink>
            </DialogTrigger>
            <Portal>
                <BaseOverlay />
                <DialogContent>
                    <BaseTitle > Deseja excluir {name} permanentemente? </BaseTitle>
                    <ButtonContainer>
                        <DeleteButton onClick={onDelete}> Excluir </DeleteButton>
                        <BackButton onClick={onBack}> Voltar </BackButton>
                    </ButtonContainer>

                </DialogContent>
            </Portal>
        </Root>
    );
};
