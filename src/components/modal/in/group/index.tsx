import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { BoxInput, Button, DialogContent, FilterIcon, Form, Input } from "./styles";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultInputError, DefaultLabel, DefaultMessageApi } from "@/css/default";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/services/axios";
import { JoinGroup } from "@/@types/Request/JoinGroup";
import { Group } from "@/@types/Group";
import { StatusMessageApi, useMessageApi } from "@/hooks/useMessageApi";

type ModalGroupInProps = {
    onChangeGroups: Function,
    groups: Group[]
}
type JoinGroupFormData = {
    code: string;
}
const joinGroupValidation = zod.object({
    code: zod.string().min(1, 'Digite um código válido'),
})



export default function ModalGroupIn({ groups, onChangeGroups }: ModalGroupInProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<JoinGroupFormData>({
        resolver: zodResolver(joinGroupValidation)
    })
    const { messageApi, insertNewMessage, deleteNewMessage } = useMessageApi();
    function onBack() {
        setOpen(false);
    }

    async function onJoinGroup(form: JoinGroupFormData) {
        const { code } = form;
        try {
            const newGroup = await api.post<JoinGroup>('/groups/members/join', {
                code: code,
            }).then((res) => {
                return res.data.group;
            });;
            onChangeGroups([...groups, newGroup]);
            reset();
            deleteNewMessage();
            onBack();
        } catch (err: any) {
            insertNewMessage(StatusMessageApi.ERROR, err.response.data.error);
        }
    } 
    return (
        <Root open={open} onOpenChange={setOpen}>
            <BaseTrigger>
                <Button>
                    Entrar em Grupo
                </Button>
            </BaseTrigger>
            <Portal >
                <BaseOverlay />
                <DialogContent>
                    <BaseTitle >  Entrar no Grupo  </BaseTitle>
                    <Form onSubmit={handleSubmit(onJoinGroup)} method="post">
                        <BoxInput>
                            <DefaultLabel> Código do Grupo </DefaultLabel>
                            <Input type="text" {...register('code')} />
                            <DefaultInputError> {errors.code?.message} </DefaultInputError>
                        </BoxInput>
                        <DefaultButton type="submit"> Entrar </DefaultButton>
                        {messageApi && (
                            <BoxInput>
                                <DefaultMessageApi status={messageApi.status}>
                                    {messageApi.message}
                                </DefaultMessageApi>
                            </BoxInput>
                        )}
                    </Form>

                </DialogContent>
            </Portal>
        </Root>
    );
};
