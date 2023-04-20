import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultButtonLink, DefaultIcon, DefaultInput, DefaultInputError, DefaultLabel, DefaultMessageApi } from "@/css/default";
import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { useState } from "react";
import { BoxBreak, BoxInput, BoxOptions, DialogTrigger, Form } from "./styles";
import RadixRadio from "@/components/radix/radio";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StatusRegister } from "@/enum/StatusRegister";
import { api } from "@/services/axios";
import { ReturnRegister } from "@/@types/Request/ReturnRegister";
import { Register } from "@/@types/Register";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ReturnGroup } from "@/@types/Request/ReturnGroup";
import { Group } from "@/@types/Group";
import { StatusMessageApi, useMessageApi } from "@/hooks/useMessageApi";


type ModalGroupEditProps = {
    onChangeGroup: Function,
    currentGroup: Group,
}

type EditGroupFormData = {
    name: string;
}
const groupEditValidation = zod.object({
    name: zod.string().min(1, 'Digite um nome válido'),
})

export default function ModalGroupEdit({ onChangeGroup, currentGroup }: ModalGroupEditProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<EditGroupFormData>({
        resolver: zodResolver(groupEditValidation)
    })
    const { messageApi, insertNewMessage, deleteNewMessage } = useMessageApi();

    async function onEditGroup(form: EditGroupFormData) {
        const { name } = form;
        try {
            const newGroup = await api.put<ReturnGroup>(`/groups/${currentGroup.id}`, {
                name,
            }).then((res) => {
                return res.data.group;
            });
            const newListGroups = {
                ...currentGroup,
                name: newGroup.name,
            };
            deleteNewMessage();
            setOpen(false);
            reset();
            onChangeGroup(newListGroups);
        } catch (err: any) {
            insertNewMessage(StatusMessageApi.ERROR, err.response.data.error);
        }
    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <DefaultButtonLink>
                    <DefaultIcon icon={faPenToSquare} />
                    Editar
                </DefaultButtonLink>

            </DialogTrigger>
            <Portal>
                <BaseOverlay />
                <BaseContent>
                    <BaseTitle >  Editar Grupo: {currentGroup.name} </BaseTitle>
                    <Form onSubmit={handleSubmit(onEditGroup)} method="post">
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" {...register("name")} defaultValue={currentGroup.name} />
                            <DefaultInputError> {errors.name?.message} </DefaultInputError>
                        </BoxInput>
                        <BoxBreak>
                            <DefaultButton type="submit"> Editar </DefaultButton>
                        </BoxBreak>
                    </Form>
                    {messageApi && (
                        <BoxBreak>
                            <DefaultMessageApi status={messageApi.status}>
                                {messageApi.message}
                            </DefaultMessageApi>
                        </BoxBreak>
                    )}
                </BaseContent>
            </Portal>
        </Root>
    )
}