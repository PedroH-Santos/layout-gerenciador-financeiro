import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DefaultButtonLink, DefaultInput, DefaultInputError, DefaultLabel, DefaultMessageApi } from '@/css/default';
import { BoxImagePreLoad, BoxInput, BoxInputFile, Button, Form, ImagePreLoad, InputFile } from './styles';
import Image from "next/image";
import { useContext, useState } from "react";
import { api } from "@/services/axios";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/authContext";
import { ReturnUser } from "@/@types/Request/ReturnUser";
import { ReturnImage } from "@/@types/Request/ReturnImage";
import { StatusMessageApi, useMessageApi } from '@/hooks/useMessageApi';

type NewUserFormData = {
    name: string;
    email: string;
    password: string;
    image: string;
}
type NewUserFormProps = {
    onChangeShowFormCreateNewUser: Function,
}

const newUserValidation = zod.object({
    name: zod.string({ required_error: "Digite um nome válido. " }).min(1, 'Digite um nome válido'),
    email: zod.string({ required_error: "Digite um email válido. " }).min(1, 'Digite um email válido').email("Digite um email válido"),
    password: zod.string({ required_error: "Digite uma senha válida. " }).min(6, 'A Senha deve ter pelo menos 6 caracteres'),
    image: zod.any().refine((files) => { return files?.length == 1; }, "Escolha uma imagem."),
})

export default function NewUserForm({ onChangeShowFormCreateNewUser }: NewUserFormProps) {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<NewUserFormData>({
        resolver: zodResolver(newUserValidation)
    })
    const router = useRouter();
    const { signIn } = useContext(AuthContext);
    const [imagePreLoadURL, setImagePreLoadURL] = useState("");
    const { messageApi, insertNewMessage } = useMessageApi();

    async function onNewUser(form: NewUserFormData) {
        const { name, email, password, image: imageObject } = form;
        const formData = new FormData();
        formData.append('file', imageObject[0]);
        try {
            const uploadImage = await api.post<ReturnImage>(`users/upload/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                return res.data.file;
            });

            const newUser = await api.post<ReturnUser>(`/users`, {
                name,
                email,
                password,
                image: uploadImage.filename
            }).then((res) => {
                return res.data.user;
            });
            await signIn({ username: email, password: password });
            insertNewMessage(StatusMessageApi.ERROR, "Usuário cadastro com sucesso ! Por favor, aguarde !");
            router.push(`/group/list`);
        } catch (err:  any) {
            let messageError = ""
            if (err.response.data.error) {
                messageError = err.response.data.error;
            }else{
                 messageError = err.response.data.message as string;
            }
            insertNewMessage(StatusMessageApi.ERROR, messageError as string);
        }
        
    }


    async function preLoadImage(event: any) {
        const imageFiles = event.target.files;
        const imageFilesLength = imageFiles.length;

        if (imageFilesLength > 0) {
            const imageSrc = URL.createObjectURL(imageFiles[0]);
            setImagePreLoadURL(imageSrc);
        }
    }

    async function onShowFormCreateNewUser() {
        onChangeShowFormCreateNewUser(false);
    }


    return (
        <Form onSubmit={handleSubmit(onNewUser)} method="post">
            <BoxInput>
                <DefaultLabel> Nome </DefaultLabel>
                <DefaultInput type="text" {...register('name')} />
            </BoxInput>
            <DefaultInputError> {errors.name?.message} </DefaultInputError>
            <BoxInput>
                <DefaultLabel> Email </DefaultLabel>
                <DefaultInput type="email" {...register('email')} />
            </BoxInput>
            <DefaultInputError> {errors.email?.message} </DefaultInputError>
            <BoxInput>
                <DefaultLabel> Senha </DefaultLabel>
                <DefaultInput type="password" {...register('password')} />
            </BoxInput>
            <DefaultInputError> {errors.password?.message} </DefaultInputError>
            <BoxInputFile>
                <DefaultLabel> Imagem </DefaultLabel>
                <InputFile type="file" {...register('image')} accept="image/*" onChange={preLoadImage} />
                <BoxImagePreLoad>
                    <ImagePreLoad src={(imagePreLoadURL != "") ? imagePreLoadURL : "/defaultUser.svg"} alt={"Imagem de Perfil"} width="300" height="300" />
                </BoxImagePreLoad>
            </BoxInputFile>
            <DefaultInputError> {errors.image?.message} </DefaultInputError>
            <Button type="submit"> Cadastrar </Button>
            <DefaultButtonLink onClick={onShowFormCreateNewUser}> Voltar </DefaultButtonLink>
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