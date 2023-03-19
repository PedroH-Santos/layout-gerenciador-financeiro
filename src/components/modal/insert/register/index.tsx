import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultInputError, DefaultLabel } from "@/css/default";
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


type ModalRegisterInsertProps = {
    groupId: string,
    onChangeRegister: Function,
    registers: Register[],
}

type InsertRegisterFormData = {
    name: string;
    price: number;
    status: string;
}
const registerInsertValidation = zod.object({
    name: zod.string().min(1, 'Digite um nome válido'),
    price:  zod.number(),
    status: zod.string()
})

export default function ModalRegisterInsert({ groupId, onChangeRegister, registers }: ModalRegisterInsertProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<InsertRegisterFormData>({
        resolver: zodResolver(registerInsertValidation)
    })

    async function onCreateRegister(form: InsertRegisterFormData) {
        const { name, price, status } = form;
        const newRegister = api.post<ReturnRegister>(`/registers`, {
            name,
            price,
            status,
            groupId,
        }).then((res) => {
            return res.data.register;
        });

        onChangeRegister([...registers,newRegister]);

    }
    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                Novo Registro
            </DialogTrigger>
            <Portal>
                <BaseOverlay />
                <BaseContent>
                    <BaseTitle >  Cadastrar Lançamentos </BaseTitle>
                    <Form onSubmit={handleSubmit(onCreateRegister)} method="post">
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" {...register("name")}/>
                            <DefaultInputError> {errors.name?.message} </DefaultInputError>
                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Preço </DefaultLabel>
                            <DefaultInput type="text" {...register('price', { valueAsNumber: true })} />
                            <DefaultInputError> {errors.price?.message} </DefaultInputError>
                        </BoxInput>
                        <BoxOptions> 
                            <DefaultLabel> Status </DefaultLabel>
                            <Controller control={control} name="status" defaultValue={StatusRegister.DEPOSIT}
                                render={({ field: { onChange, value, ref, ...props } }) => (
                                    <RadixRadio  onValueChange={onChange} value={value}/>
                                )}
                            />
                            <DefaultInputError> {errors.status?.message} </DefaultInputError>
                        </BoxOptions>
                        <BoxBreak>
                            <DefaultButton type="submit"> Lançar </DefaultButton>
                        </BoxBreak>
                    </Form>

                </BaseContent>
            </Portal>
        </Root>
    )
}