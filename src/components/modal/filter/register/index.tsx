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

type ModalRegisterFilterProps = {
    onChangeRegisters: Function,
}

type FilterRegisterFormData = {
    name: string;
    releaseDate: string;
}
const RegisterFilterValidation = zod.object({
    name: zod.string().optional(),
    releaseDate: zod.string().optional(),
})


export default function ModalRegisterFilter({ onChangeRegisters }: ModalRegisterFilterProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FilterRegisterFormData>({
        resolver: zodResolver(RegisterFilterValidation)
    })

    function onBack() {
        setOpen(false);
    }
    async function onFilter(form: FilterRegisterFormData) {
        const { name, releaseDate } = form;
        let registers = [];

        if (name == '' && releaseDate == '') {
            registers = await api.get<ListRegisters>('/registers').then((res) => {
                return res.data.registers;
            });
        } else {
            const params = {
                name,
                createdAt: releaseDate,
            }
            registers = await api.get<ListRegisters>('/register/filter', {
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
                            <DefaultLabel> Data de Lançamento </DefaultLabel>
                            <DefaultInput type="text" {...register('releaseDate')} />
                            <DefaultInputError> {errors.releaseDate?.message} </DefaultInputError>

                        </BoxInput>
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
