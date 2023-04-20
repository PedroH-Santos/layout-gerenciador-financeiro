import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultInputError, DefaultInputPrice, DefaultLabel, DefaultMessageApi } from "@/css/default";
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
import { StatusMessageApi, useMessageApi } from "@/hooks/useMessageApi";


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
    price: zod.number({ required_error: "Digite um preço válido. " }),
    status: zod.string().min(1, 'Digite um status válido.')
})

export default function ModalRegisterInsert({ groupId, onChangeRegister, registers }: ModalRegisterInsertProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<InsertRegisterFormData>({
        resolver: zodResolver(registerInsertValidation)
    })
    const { messageApi, insertNewMessage, deleteNewMessage } = useMessageApi();


    async function onCreateRegister(form: InsertRegisterFormData) {
        const { name, price, status } = form;
        try {
            const newRegister = await api.post<ReturnRegister>(`/registers`, {
                name,
                price,
                status,
                groupId,
            }).then((res) => {
                return res.data.register;
            });
            deleteNewMessage();
            setOpen(false);
            reset();
            onChangeRegister([...registers, newRegister]);
        } catch (err: any) {
            insertNewMessage(StatusMessageApi.ERROR, err.response.data.error);

        }
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
                            <DefaultInput type="text" {...register("name")} />
                            <DefaultInputError> {errors.name?.message} </DefaultInputError>
                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Preço </DefaultLabel>
                            <Controller
                                control={control}
                                name="price"

                                render={({ field: { onChange } }) => (
                                    <DefaultInputPrice
                                        name="price"
                                        displayType="input"
                                        thousandSeparator="."
                                        prefix="R$"
                                        decimalSeparator=","
                                        fixedDecimalScale={true}
                                        decimalScale={2}
                                        allowNegative={false}
                                        onChange={(event) => onChange(parseFloat((event.target.value.replace("R$", "").replace(".", "").replace(",", "."))))}

                                    />

                                )}
                            />
                            <DefaultInputError> {errors.price?.message} </DefaultInputError>
                        </BoxInput>
                        <BoxOptions>
                            <DefaultLabel> Status </DefaultLabel>
                            <Controller control={control} name="status" defaultValue={StatusRegister.DEPOSIT}
                                render={({ field: { onChange, value, ref, ...props } }) => (
                                    <RadixRadio onValueChange={onChange} value={value} />
                                )}
                            />
                            <DefaultInputError> {errors.status?.message} </DefaultInputError>
                        </BoxOptions>
                        <BoxBreak>
                            <DefaultButton type="submit"> Lançar </DefaultButton>
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