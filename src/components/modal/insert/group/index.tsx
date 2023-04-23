import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultInputError, DefaultLabel, DefaultMessageApi } from "@/css/default";
import { Portal, Root } from "@radix-ui/react-dialog";
import { useState } from "react";
import { BoxBreak, BoxInput, BoxOptions, DialogTrigger, Form } from "./styles";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/services/axios";
import { Group } from "@/@types/Group";
import { InsertGroup } from "@/@types/Request/InsertGroup";
import { StatusMessageApi, useMessageApi } from "@/hooks/useMessageApi";


type ModalGroupInsertProps = {
    onChangeGroups: Function,
    groups: Group[]
}

type InsertGroupFormData = {
    name: string;
}
const groupInsertValidation = zod.object({
    name: zod.string().min(1, 'Digite um nome válido'),
})

export default function ModalGroupInsert({ groups, onChangeGroups }: ModalGroupInsertProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<InsertGroupFormData>({
        resolver: zodResolver(groupInsertValidation)
    })
    const { messageApi, insertNewMessage, deleteNewMessage } = useMessageApi();

    async function onInsertGroup(form: InsertGroupFormData) {
        const { name } = form;
        try {
            const newGroup = await api.post<InsertGroup>('/groups', {
                name,
            }).then((res) => {
                return res.data.group;
            });

            onChangeGroups([...groups, newGroup]);
            deleteNewMessage();
            reset();
            setOpen(false);
        } catch (err: any) {
            console.log(err);
            insertNewMessage(StatusMessageApi.ERROR, err.response.data.error);
        }
    }
    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                Novo Grupo
            </DialogTrigger>
            <Portal>
                <BaseOverlay />
                <BaseContent>
                    <BaseTitle >  Cadastrar Grupo </BaseTitle>
                    <Form onSubmit={handleSubmit(onInsertGroup)} method="post">
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" {...register('name')} />
                            <DefaultInputError> {errors.name?.message} </DefaultInputError>
                        </BoxInput>
                        <BoxBreak>
                            <DefaultButton type="submit"> Cadastrar </DefaultButton>
                        </BoxBreak>
                        {messageApi && (
                            <BoxBreak>
                                <DefaultMessageApi status={messageApi.status}>
                                    {messageApi.message}
                                </DefaultMessageApi>
                            </BoxBreak>
                        )}
                    </Form>

                </BaseContent>
            </Portal>
        </Root>
    )
}