
import { DefaultInput, DefaultInputError, DefaultLabel } from '@/css/default';
import { Box, BoxInput, Button, Container, Form } from './styles';
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

type LoginFormData = {
    username: string;
    password: string;
}
const loginValidation = zod.object({
    username: zod.string().min(1, 'Digite um email válido').email(),
    password: zod.string().min(6, 'A Senha deve ter pelo menos 6 caracteres')
})
export default function Home() {

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<LoginFormData>({
        resolver: zodResolver(loginValidation)
    })
    const { signIn } = useContext(AuthContext);
    async function onLogin(form: LoginFormData) {
        const { username, password } = form;
        await signIn({ username, password });
    }

    return (
        <>
            <Container>
                <Box>
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
                    </Form>
                </Box>
            </Container>
        </>
    )

}