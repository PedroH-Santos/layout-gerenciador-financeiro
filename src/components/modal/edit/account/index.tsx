import { BaseContent, BaseOverlay, BaseTitle } from "../../base/styles";
import { DefaultButton, DefaultIcon, DefaultInput, DefaultInputError, DefaultInputPrice, DefaultLabel, DefaultMessageApi } from "@/css/default";
import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { useState } from "react";
import { BoxBreak, BoxInput, DialogTrigger, Form } from "./styles";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/axios";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ReturnAccount } from "@/@types/Request/ReturnAccount";
import { Account } from "@/@types/Account";
import { Controller, useForm } from "react-hook-form";
import { StatusMessageApi, useMessageApi } from "@/hooks/useMessageApi";


type ModalAccountEditProps = {
    onChangeAccount: Function,
    currentAccount: Account,
    accounts: Account[],
}

type EditAccountFormData = {
    name: string;
    price: string;
}
const accountEditValidation = zod.object({
    name: zod.string().optional(),
    price: zod.number().optional(),
})

export default function ModalAccountEdit({ onChangeAccount, accounts, currentAccount }: ModalAccountEditProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<EditAccountFormData>({
        resolver: zodResolver(accountEditValidation)
    })
    const { messageApi, insertNewMessage, deleteNewMessage } = useMessageApi();

    async function onEditAccount(form: EditAccountFormData) {
        try {
            const { name, price } = form;
            const editAccount = await api.put<ReturnAccount>(`/accounts/${currentAccount.id}`, {
                name,
                price,
            }).then((res) => {
                return res.data.account;
            });
            const newAccounts = accounts.map(account => {
                if (account.id == currentAccount.id) {
                    return {
                        ...account,
                        name: editAccount.name,
                        price: editAccount.price,
                    };;
                } else {
                    return account;
                }
            })
            setOpen(false);
            deleteNewMessage();
            onChangeAccount(newAccounts);
        } catch (err: any) {
            insertNewMessage(StatusMessageApi.ERROR, err.response.data.error);
        }


    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <DefaultIcon icon={faPenToSquare} />
            </DialogTrigger>
            <Portal>
                <BaseOverlay />
                <BaseContent>
                    <BaseTitle >  Editar Conta: {currentAccount.name} </BaseTitle>
                    <Form onSubmit={handleSubmit(onEditAccount)} method="post">
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" {...register("name")} defaultValue={currentAccount.name} />
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
                                        defaultValue={currentAccount.price}
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
                        <BoxBreak>
                            <DefaultButton type="submit"> Editar </DefaultButton>
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