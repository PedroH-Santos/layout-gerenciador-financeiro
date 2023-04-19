
import { DefaultButtonLink, DefaultInput, DefaultInputError, DefaultLabel, DefaultMessageApi } from '@/css/default';
import { BoxInput, Button, Form } from './styles';
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { StatusMessageApi, useMessageApi } from '@/hooks/useMessageApi';

type LoginFormData = {
    username: string;
    password: string;
}

type LoginFormProps = {
    onChangeShowFormCreateNewUser: Function,
}
const loginValidation = zod.object({
    username: zod.string({ required_error: "Digite um email válido. " }).min(1, 'Digite um email válido').email("Digite um email válido"),
    password: zod.string({ required_error: "Digite uma senha válida. " }).min(6, 'A Senha deve ter pelo menos 6 caracteres')
})
export default function LoginForm({ onChangeShowFormCreateNewUser }: LoginFormProps) {

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<LoginFormData>({
        resolver: zodResolver(loginValidation)
    })
    const { signIn } = useContext(AuthContext);
    const { messageApi, insertNewMessage } = useMessageApi();


    async function onLogin(form: LoginFormData) {
        const { username, password } = form;
        try {
            await signIn({ username, password });
        } catch (err: any) {
            insertNewMessage(StatusMessageApi.ERROR, err.response.data.error as string);
        }
    }

    async function onShowFormCreateNewUser() {
        onChangeShowFormCreateNewUser(true);
    }

    return (
        <Form onSubmit={handleSubmit(onLogin)} method="post">
            <BoxInput>
                <DefaultLabel> Email </DefaultLabel>
                <DefaultInput type="email" {...register('username')} />
            </BoxInput>
            <DefaultInputError> {errors.username?.message} </DefaultInputError>
            <BoxInput>
                <DefaultLabel> Senha </DefaultLabel>
                <DefaultInput type="password" {...register('password')} />
            </BoxInput>
            <DefaultInputError> {errors.password?.message} </DefaultInputError>
            <Button type="submit"> Logar </Button>
            <DefaultButtonLink onClick={onShowFormCreateNewUser}> Cadastrar novo usuario </DefaultButtonLink>
            {messageApi && (
                <BoxInput>
                    <DefaultMessageApi status={messageApi.status}>
                        {messageApi.message}
                    </DefaultMessageApi>
                </BoxInput>

            )}

        </Form>
    )
}