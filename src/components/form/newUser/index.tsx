import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DefaultButtonLink, DefaultInput, DefaultInputError, DefaultLabel } from '@/css/default';
import { BoxInput, Button, Form } from './styles';

type NewUserFormData = {
    name: string;
    email: string;
    password: string;
    image: string;
}
const newUserValidation = zod.object({
    name: zod.string().min(1,'Digite um nome válido'),
    email: zod.string().min(1, 'Digite um email válido').email(),
    password: zod.string().min(6, 'A Senha deve ter pelo menos 6 caracteres'),
    image: zod.string().min(1,'Insira uma imagem de perfil'),
})

export default function NewUserForm(){
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<NewUserFormData>({
        resolver: zodResolver(newUserValidation)
    })

    async function onNewUser() {

    }
    return (
        <Form onSubmit={handleSubmit(onNewUser)} method="post">
            <BoxInput>
                <DefaultLabel> Nome </DefaultLabel>
                <DefaultInput type="text" {...register('name')} />
                <DefaultInputError> {errors.name?.message} </DefaultInputError>

            </BoxInput>
            <BoxInput>
                <DefaultLabel> Email </DefaultLabel>
                <DefaultInput type="email" {...register('email')} />
                <DefaultInputError> {errors.email?.message} </DefaultInputError>

            </BoxInput>
            <BoxInput>
                <DefaultLabel> Senha </DefaultLabel>
                <DefaultInput type="password" {...register('password')} />
                <DefaultInputError> {errors.password?.message} </DefaultInputError>

            </BoxInput>
            <BoxInput>
                <DefaultLabel> Imagem </DefaultLabel>
                <DefaultInput type="image" {...register('image')} />
                <DefaultInputError> {errors.image?.message} </DefaultInputError>

            </BoxInput>
            <Button type="submit"> Cadastrar </Button>
        </Form>
    )
}