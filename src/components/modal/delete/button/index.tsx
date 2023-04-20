import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { DialogContent, DeleteButton, BackButton, ButtonContainer, DialogTrigger } from "./styles";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseOverlay, BaseTrigger, BaseTitle } from "../../base/styles";
import { DefaultButtonLink, DefaultIcon, DefaultMessageApi } from "@/css/default";
import { Router, useRouter } from "next/router";
import { StatusMessageApi, useMessageApi } from "@/hooks/useMessageApi";


type ModalDeleteProps = {
    name: string;
    onDeleteCallBack: Function;
    idDelete: string;
}

export default function ModalDeleteButton({ name, onDeleteCallBack, idDelete }: ModalDeleteProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { messageApi, insertNewMessage, deleteNewMessage } = useMessageApi();

    function onBack() {
        setOpen(false);
    }
    function onDelete() {
        try{
            onDeleteCallBack(idDelete); 
        }catch(err: any) {
            insertNewMessage(StatusMessageApi.ERROR, err.response.data.error);
        }
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
