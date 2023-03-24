import { DefaultButton, DefaultInput, DefaultInputError, DefaultLabel } from "@/css/default";
import { BoxBreakInputs, BoxGroupSelection, BoxInput, Form, InputSelectGroup } from "./styles";
import RadixSelect from "@/components/radix/select";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { api } from "@/services/axios";
import { InsertAccount } from "@/@types/Request/InsertAccount";
import { TypeAccount } from "@/enum/TypeAccount";
import { StatusAccount } from "@/enum/StatusAccount";

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
    name: zod.string().min(1,'Digite um nome válido'),
    price: zod.number(),
    type: zod.string(),
    status: zod.string(),
    dayDueDate: zod.number(),
    installments: zod.number().max(12),
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
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<CreateAccountFormData>({
        resolver: zodResolver(createAccountValidation)
    })
    async function onCreate(form: CreateAccountFormData ){
        const {dayDueDate,installments,name,price,status,type} = form;
        const newAccounts = await api.post<InsertAccount>('/accounts', {
            name,
            price: price,
            status,
            type,
            installments: installments,
            dayDueDate: dayDueDate,
            groupId: groupId
        }).then((res) => {
            return res.data.account;
        });
    }
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
                    <DefaultInput  {...register('price', { valueAsNumber: true })} />
                    <DefaultInputError> {errors.price?.message} </DefaultInputError>
                </BoxInput>
                <BoxInput>
                    <DefaultLabel> Dia de Vencimento </DefaultLabel>
                    <DefaultInput  {...register('dayDueDate', { valueAsNumber: true})}  />
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
                    <DefaultInput  {...register('installments', { valueAsNumber: true })} />
                    <DefaultInputError> {errors.installments?.message} </DefaultInputError>
                </BoxInput>
            </BoxBreakInputs>
            <BoxBreakInputs>
                <DefaultButton type="submit">
                    Cadastrar
                </DefaultButton>
            </BoxBreakInputs>
        </Form>
    )
}