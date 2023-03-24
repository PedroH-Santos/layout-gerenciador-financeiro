import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DefaultButtonLink, DefaultInput, DefaultInputError, DefaultLabel } from '@/css/default';
import { BoxImagePreLoad, BoxInput, BoxInputFile, Button, Form, ImagePreLoad, InputFile } from './styles';
import Image from "next/image";

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
    image: zod.any().refine((files) => { return files?.length == 1; }, "Escolha uma imagem."),
})

export default function NewUserForm(){
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<NewUserFormData>({
        resolver: zodResolver(newUserValidation)
    })

    async function onNewUser(form: NewUserFormData ) {
        console.log(form);
    }


    async function preLoadImage(event: any){
        const imageFiles = event.target.files;
        const imageFilesLength = imageFiles.length;

        if(imageFilesLength > 0) {
            const imageSrc = URL.createObjectURL(imageFiles[0]);
            const imagePreviewElement: any = document.querySelector("#preview-selected-image");
            if (imagePreviewElement != null) {
                imagePreviewElement.src = imageSrc;
            }
            
            
        }
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
            <BoxInputFile>
                <DefaultLabel> Imagem </DefaultLabel>
                <InputFile type="file" {...register('image')} accept="image/*" onChange={preLoadImage} />
                <BoxImagePreLoad>
                    <ImagePreLoad id="preview-selected-image" src={""} alt={""} />
                </BoxImagePreLoad>
                <DefaultInputError> {errors.image?.message} </DefaultInputError>

            </BoxInputFile>
            <Button type="submit"> Cadastrar </Button>
        </Form>
    )
}