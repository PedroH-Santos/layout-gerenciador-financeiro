import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultIcon, DefaultInput, DefaultInputError, DefaultLabel } from "@/css/default";
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


type ModalRegisterEditProps = {
    onChangeRegister: Function,
    registers: Register[],
    currentRegister: Register,
}

type EditRegisterFormData = {
    name: string;
    price: number;
    status: StatusRegister;
}
const registerEditValidation = zod.object({
    name: zod.string().min(1, 'Digite um nome válido'),
    price:  zod.number(),
    status: zod.string()
})

export default function ModalRegisterEdit({  onChangeRegister, registers, currentRegister }: ModalRegisterEditProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<EditRegisterFormData>({
        resolver: zodResolver(registerEditValidation)
    })

    async function onCreateRegister(form: EditRegisterFormData) {
        const { name, price, status } = form;
        const statusRegister: StatusRegister = status as StatusRegister;
        const newRegister = await api.put<ReturnRegister>(`/registers/${currentRegister.id}`, {
            name,
            price,
            status: statusRegister,
        }).then((res) => {
            return res.data.register;
        });
        const newRegisters = registers.map(register => {
            if (register.id == newRegister.id) {
                return {
                    ...register,
                    name: newRegister.name,
                    price: newRegister.price,
                    status: newRegister.status
                };;
            }else{
                return register;
            }
        })
        onChangeRegister(newRegisters);

    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <DefaultIcon icon={faPenToSquare} />
            </DialogTrigger>
            <Portal>
                <BaseOverlay />
                <BaseContent>
                    <BaseTitle >  Cadastrar Lançamentos </BaseTitle>
                    <Form onSubmit={handleSubmit(onCreateRegister)} method="post">
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" {...register("name")} defaultValue={currentRegister.name}/>
                            <DefaultInputError> {errors.name?.message} </DefaultInputError>
                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Preço </DefaultLabel>
                            <DefaultInput type="text" {...register('price', { valueAsNumber: true })} defaultValue={currentRegister.price} />
                            <DefaultInputError> {errors.price?.message} </DefaultInputError>
                        </BoxInput>
                        <BoxOptions> 
                            <DefaultLabel> Status </DefaultLabel>
                            <Controller control={control} name="status" defaultValue={currentRegister.status} 
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