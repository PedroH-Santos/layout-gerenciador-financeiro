import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import {  BoxInput, Button, FilterIcon, Form } from "./styles";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultInputError, DefaultLabel } from "@/css/default";
import { api } from "@/services/axios";
import { ListGroups } from "@/@types/Request/ListGroups";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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


export default function ModalGroupFilter({ onChangeGroups }: ModalGroupFilterProps ) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FilterGroupFormData> ({
        resolver: zodResolver(groupFilterValidation)
    })

    function onBack() {
        setOpen(false);
    }

    async function onFilter(form: FilterGroupFormData){
    

        
        const groups = await api.get<ListGroups>('/groups/filter', {
            params: {
                name: form.name,
                code: form.code
            }
        }).then((res) => {
            console.log(res);

            return res.data.groups;;
        });

        onChangeGroups(groups);
    }
    return (
        <Root open={open} onOpenChange={setOpen}>
            <BaseTrigger>
                <Button>
                    <FilterIcon icon={faFilter}  />
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
