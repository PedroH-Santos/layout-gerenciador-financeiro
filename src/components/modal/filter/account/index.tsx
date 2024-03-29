import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { BoxInput, Button, FilterIcon, Form } from "./styles";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultLabel, DefaultMessageApi } from "@/css/default";
import RadixSelect from "@/components/radix/select";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ListAccounts } from "@/@types/Request/ListAccounts";
import { api } from "@/services/axios";
import { useMessageApi, StatusMessageApi } from "@/hooks/useMessageApi";

type ModalAccountFilterProps = {
    onChangeAccounts: Function,
    groupId: string;
}

type FilterAccountFormData = {
    dayDueDate: string;
    name: string;
    status: string;
    type: string;
}
const accountFilterValidation = zod.object({
    dayDueDate: zod.string().optional(),
    name: zod.string().optional(),
    status: zod.string().optional(),
    type: zod.string().optional(),
})



export default function ModalAccountFilter({ onChangeAccounts, groupId }: ModalAccountFilterProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FilterAccountFormData>({
        resolver: zodResolver(accountFilterValidation)
    })
    const { messageApi, insertNewMessage, deleteNewMessage } = useMessageApi();


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
    function onBack() {
        setOpen(false);
    }

    async function onFilter(form: FilterAccountFormData) {
        try {
            const { name, dayDueDate, status, type } = form;
            let accounts = [];
            let traitStatus = status == 'Nenhum' ? "" : status;
            let traitType = type == 'Nenhum' ? "" : type;

            if (dayDueDate == '' && status == 'Nenhum' && name == '' && type == 'Nenhum') {
                accounts = await api.get<ListAccounts>(`/accounts/${groupId}`).then((res) => {
                    return res.data.accounts;
                });
            } else {
                const params = {
                    name,
                    dayDueDate,
                    status: traitStatus,
                    type: traitType,
                    groupId: groupId,
                }
                accounts = await api.get<ListAccounts>('/accounts/filter', {
                    params
                }).then((res) => {
                    return res.data.accounts;
                });

            }
            deleteNewMessage();
            setOpen(false);
            onChangeAccounts(accounts);
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
                    <BaseTitle >  Filtrar Contas </BaseTitle>
                    <Form onSubmit={handleSubmit(onFilter)} method="post">
                        <BoxInput>
                            <DefaultLabel> Dia de Vencimento </DefaultLabel>
                            <DefaultInput type="text" {...register('dayDueDate')} />
                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" {...register('name')} />
                        </BoxInput>
                        <BoxInput>
                            <Controller control={control} name="status" defaultValue="Nenhum"
                                render={({ field: { onChange, value, ref, ...props } }) => (
                                    <RadixSelect name="Status" options={typeStatesAccount} onValueChange={onChange} value={value} fncRef={ref} />
                                )}
                            />
                        </BoxInput>
                        <BoxInput>
                            <Controller control={control} name="type" defaultValue="Nenhum"
                                render={({ field: { onChange, value, ref, ...props } }) => (
                                    <RadixSelect name="Tipo" options={typeAccount} onValueChange={onChange} value={value} fncRef={ref} />
                                )}
                            />
                        </BoxInput>
                        <DefaultButton type="submit"> Filtrar </DefaultButton>

                        {messageApi && (
                            <BoxInput>
                                <DefaultMessageApi status={messageApi.status}>
                                    {messageApi.message}
                                </DefaultMessageApi>
                            </BoxInput>
                        )}
                    </Form>

                </BaseContent>
            </Portal>
        </Root>
    );
};
