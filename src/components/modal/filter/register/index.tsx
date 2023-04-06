import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import {  BoxInput, Button, FilterIcon, Form } from "./styles";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultInputError, DefaultLabel } from "@/css/default";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ListRegisters } from "@/@types/Request/ListRegisters";
import { api } from "@/services/axios";
import { Group } from "@/@types/Group";

type ModalRegisterFilterProps = {
    onChangeRegisters: Function,
    group: Group,
}

type FilterRegisterFormData = {
    name: string;
}
const RegisterFilterValidation = zod.object({
    name: zod.string().optional(),
})


export default function ModalRegisterFilter({ onChangeRegisters, group }: ModalRegisterFilterProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FilterRegisterFormData>({
        resolver: zodResolver(RegisterFilterValidation)
    })

    function onBack() {
        setOpen(false);
    }
    async function onFilter(form: FilterRegisterFormData) {
        const { name } = form;
        let registers = [];

        if (name == '' ) {
            registers = await api.get<ListRegisters>(`/registers/${group}`).then((res) => {
                return res.data.registers;
            });
        } else {
            const params = {
                name,
            }
            registers = await api.get<ListRegisters>('/registers/filter', {
                params
            }).then((res) => {
                return res.data.registers;
            });

        }


        onChangeRegisters(registers);
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
                    <BaseTitle >  Filtrar Lançamentos </BaseTitle>
                    <Form onSubmit={handleSubmit(onFilter)} method="post">
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" {...register('name')} />
                            <DefaultInputError> {errors.name?.message} </DefaultInputError>

                        </BoxInput>
                        <DefaultButton type="submit"> Filtrar </DefaultButton>
                    </Form>

                </BaseContent>
            </Portal>
        </Root>
    );
};
