
import { DefaultButtonLink, DefaultInput, DefaultInputError, DefaultLabel } from '@/css/default';
import {  BoxInput, Button,  Form } from './styles';
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/authContext';

type LoginFormData = {
    username: string;
    password: string;
}

type LoginFormProps = {
    onChangeShowFormCreateNewUser: Function,
}
const loginValidation = zod.object({
    username: zod.string().min(1, 'Digite um email válido').email(),
    password: zod.string().min(6, 'A Senha deve ter pelo menos 6 caracteres')
})
export default function LoginForm({ onChangeShowFormCreateNewUser  }: LoginFormProps){
    
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<LoginFormData>({
        resolver: zodResolver(loginValidation)
    })
    const { signIn } = useContext(AuthContext);
    async function onLogin(form: LoginFormData) {
        const { username, password } = form;
        await signIn({ username, password });
    }

    async function onShowFormCreateNewUser(){
        onChangeShowFormCreateNewUser(true);
    }

    return (
        <Form onSubmit={handleSubmit(onLogin)} method="post">
            <BoxInput>
                <DefaultLabel> Email </DefaultLabel>
                <DefaultInput type="email" {...register('username')} />
                <DefaultInputError> {errors.username?.message} </DefaultInputError>

            </BoxInput>
            <BoxInput>
                <DefaultLabel> Senha </DefaultLabel>
                <DefaultInput type="password" {...register('password')} />
                <DefaultInputError> {errors.password?.message} </DefaultInputError>

            </BoxInput>
            <Button type="submit"> Logar </Button>
            <DefaultButtonLink onClick={onShowFormCreateNewUser}> Cadastrar novo usuario </DefaultButtonLink>
        </Form>
    )
}