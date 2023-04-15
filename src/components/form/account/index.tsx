import { DefaultButton, DefaultInput, DefaultInputError, DefaultInputPrice, DefaultLabel, DefaultMessageApi } from "@/css/default";
import { BoxBreakInputs, BoxGroupSelection, BoxInput, Form, InputSelectGroup } from "./styles";
import RadixSelect from "@/components/radix/select";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { api } from "@/services/axios";
import { InsertAccount } from "@/@types/Request/InsertAccount";
import { TypeAccount } from "@/enum/TypeAccount";
import { StatusAccount } from "@/enum/StatusAccount";
import { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';
import { StatusMessageApi, useMessageApi } from "@/hooks/useMessageApi";


type CreateAccountFormData = {
    name: string;
    price: number;
    dayDueDate: number;
    installments: number;
    type: TypeAccount;
    status: StatusAccount;
}

type AccountFormProps = {
    groupId: string;
}
const createAccountValidation = zod.object({
    name: zod.string().min(1, 'Digite um nome válido.'),
    price: zod.number({ required_error: "Digite um preço válido. " }),
    type: zod.string().min(1, 'Digite um tipo válido.'),
    status: zod.string().min(1, 'Digite um status válido.'),
    dayDueDate: zod.number({ required_error: "Digite um dia válido. ", invalid_type_error: "Digite um dia válido." }).lte(30, "A data de vencimento deve ser no intervalo do dia 1 até o dia 30."),
    installments: zod.number({ required_error: "Digite uma parcela válida ", invalid_type_error: "Digite uma parcela válida." }).max(12, " O número máximo de parcelas é até máximo 12"),
})


export default function AccountForm({ groupId }: AccountFormProps) {
    const typeStatesAccount = [
        {
            "text": "Paga",
            "value": "PAYED"
        },
        {
            "text": "Atrasada",
            "value": "LATED"
        },
        {
            "text": "Aguardando Pagamento",
            "value": "PENDING"
        }
    ]
    const typeAccount = [
        {
            "text": "Recorrente",
            "value": "RECURRENT"
        },
        {
            "text": "Parcelada",
            "value": "PARCEL"
        }
    ]
    const { register, handleSubmit, formState: { errors }, control, reset, watch, setValue } = useForm<CreateAccountFormData>({
        resolver: zodResolver(createAccountValidation)
    })
    const watchTypeAccount = watch("type");
    const { messageApi, insertNewMessage} = useMessageApi();

    async function onCreate(form: CreateAccountFormData) {
        let { dayDueDate, installments, name, price, status, type } = form;

        if (type == TypeAccount.RECURRENT) {
            installments = 1;
        }
        try {
            const newAccounts = await api.post<InsertAccount>('/accounts', {
                name,
                price: price,
                status: 'teste',
                type,
                installments: installments,
                dayDueDate: dayDueDate,
                groupId: groupId
            }).then((res) => {
                insertNewMessage(StatusMessageApi.SUCCESS, "Conta cadastrada com sucesso !");
                return res.data.account;
            });
        } catch (err: any) {
            
            insertNewMessage(StatusMessageApi.ERROR, err.response.data.message[0] as string);
        }
    }

    useEffect(() => {
        if (watchTypeAccount == TypeAccount.RECURRENT) {
            setValue("installments", 1);
        }


    }, [setValue, watchTypeAccount])
    return (
        <Form onSubmit={handleSubmit(onCreate)} method="post">
            <BoxBreakInputs>
                <BoxInput>
                    <DefaultLabel> Nome </DefaultLabel>
                    <DefaultInput  {...register('name')} />
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
                <BoxInput>
                    <DefaultLabel> Dia de Vencimento </DefaultLabel>
                    <DefaultInput  {...register('dayDueDate', { valueAsNumber: true })} />
                    <DefaultInputError> {errors.dayDueDate?.message} </DefaultInputError>
                </BoxInput>
                <BoxInput>
                    <Controller control={control} name="type" defaultValue={TypeAccount.PARCEL}
                        render={({ field: { onChange, value, ref, ...props } }) => (
                            <RadixSelect name="Tipo" options={typeAccount} onValueChange={onChange} value={value} fncRef={ref} />
                        )}
                    />
                    <DefaultInputError> {errors.status?.message} </DefaultInputError>
                </BoxInput>
            </BoxBreakInputs>
            <BoxBreakInputs>
                <BoxInput>
                    <Controller control={control} name="status" defaultValue={StatusAccount.PENDING}
                        render={({ field: { onChange, value, ref, ...props } }) => (
                            <RadixSelect name="Status" options={typeStatesAccount} onValueChange={onChange} value={value} fncRef={ref} />
                        )}
                    />
                    <DefaultInputError> {errors.type?.message} </DefaultInputError>
                </BoxInput>
                <BoxInput>
                    <DefaultLabel> Parcelas </DefaultLabel>
                    <DefaultInput  {...register('installments', { valueAsNumber: true })} readOnly={watchTypeAccount == TypeAccount.RECURRENT ? true : false} />
                    <DefaultInputError> {errors.installments?.message} </DefaultInputError>
                </BoxInput>

            </BoxBreakInputs>
            <BoxBreakInputs>
                <DefaultButton type="submit">
                    Cadastrar
                </DefaultButton>
            </BoxBreakInputs>
            { messageApi && (
                <BoxBreakInputs>
                    <DefaultMessageApi status={messageApi.status}>
                        {messageApi.message}
                    </DefaultMessageApi>
                </BoxBreakInputs>
            )}
        </Form>
    )
}