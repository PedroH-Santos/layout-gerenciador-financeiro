import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { BoxInput, Button, FilterIcon, Form } from "./styles";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultInputError, DefaultLabel } from "@/css/default";
import { api } from "@/services/axios";
import { ListGroups } from "@/@types/Request/ListGroups";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StatusMessageApi, useMessageApi } from "@/hooks/useMessageApi";

type ModalGroupFilterProps = {
    onChangeGroups: Function,
}

type FilterGroupFormData = {
    name: string;
    code: string;
}
const groupFilterValidation = zod.object({
    name: zod.string().optional(),
    code: zod.string().optional(),
})


export default function ModalGroupFilter({ onChangeGroups }: ModalGroupFilterProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FilterGroupFormData>({
        resolver: zodResolver(groupFilterValidation)
    })
    const { messageApi, insertNewMessage, deleteNewMessage } = useMessageApi();

    function onBack() {
        setOpen(false);
    }

    async function onFilter(form: FilterGroupFormData) {
        const { name, code } = form;
        let groups = [];
        try {
            if (name == '' && code == '') {
                groups = await api.get<ListGroups>('/groups').then((res) => {
                    return res.data.groups;
                });
            } else {
                const params = {
                    name,
                    code,
                }
                groups = await api.get<ListGroups>('/groups/filter', {
                    params
                }).then((res) => {
                    return res.data.groups;
                });

            }

            onBack();
            deleteNewMessage();
            onChangeGroups(groups);
        } catch (err: any) {
            insertNewMessage(StatusMessageApi.ERROR, err.response.data.error);
        }
    }
    return (
        <Root open={open} onOpenChange={setOpen}>
            <BaseTrigger>
                <Button>
                    <FilterIcon icon={faFilter} />
                    Filtros
                </Button>
            </BaseTrigger>
            <Portal>
                <BaseOverlay />
                <BaseContent>
                    <BaseTitle >  Filtrar Grupos </BaseTitle>
                    <Form onSubmit={handleSubmit(onFilter)} method="post" >
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" {...register('name')} />
                            <DefaultInputError> {errors.name?.message} </DefaultInputError>
                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Codigo </DefaultLabel>
                            <DefaultInput type="text" {...register('code')} />
                            <DefaultInputError> {errors.code?.message} </DefaultInputError>
                        </BoxInput>
                        <DefaultButton type="submit"> Filtrar </DefaultButton>

                    </Form>

                </BaseContent>
            </Portal>
        </Root>
    );
};
