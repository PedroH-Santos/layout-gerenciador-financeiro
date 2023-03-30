import { useEffect, useState } from "react";
import { BaseOverlay, BaseTrigger, BaseTitle } from "../base/styles";
import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { UserIcon, UserName, DialogTrigger, BoxInput, DialogContent, BoxUpload, UserIconConfig, Form, ImageUser, BoxInputFile, BoxImagePreLoad, ImagePreLoad } from "./styles";
import { DefaultButton, DefaultIcon, DefaultInput, DefaultInputError, DefaultLabel } from "@/css/default";
import { faFileEdit } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/services/axios";
import { ReturnImage } from "@/@types/Request/ReturnImage";
import { ReturnUser } from "@/@types/Request/ReturnUser";
import { User } from "@/@types/User";

type ModalConfigurationProps = {
    user: User | undefined
}
type EditUserFormData = {
    name: string;
    email: string;
    password: string;
    image: string;
}

const editUserValidation = zod.object({
    name: zod.string().optional(),
    email: zod.string().optional(),
    password: zod.string().optional(),
    image: zod.any().optional(),
})


export default function ModalConfiguration({ user }: ModalConfigurationProps) {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<EditUserFormData>({
        resolver: zodResolver(editUserValidation)
    })
    const [imagePreLoadURL, setImagePreLoadURL] = useState("");
    async function onNewUser(form: EditUserFormData) {
        const { name, email, password, image: imageObject } = form;
        let editImage = "";
        if (imageObject.length > 0){
            const formData = new FormData();
            formData.append('file', imageObject[0]);
            const uploadImage = await api.post<ReturnImage>(`users/upload/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                return res.data.file;
            });
            editImage = uploadImage.filename;
        }


        const newUser = await api.put<ReturnUser>(`/users/${user?.id}`, {
            name,
            email,
            password,
            image: editImage
        }).then((res) => {
            return res.data.user;
        });
    }

    useEffect(() => {
        setImagePreLoadURL("http://localhost:3000/public/" + user?.image);
    }),[] 

    async function preLoadImage(event: any) {
        const imageFiles = event.target.files;
        const imageFilesLength = imageFiles.length;

        if (imageFilesLength > 0) {
            const imageSrc = URL.createObjectURL(imageFiles[0]);
            setImagePreLoadURL(imageSrc);
        }
    }
    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <UserIcon>
                    { user?.image != undefined && (
                        <ImageUser src={"http://localhost:3000/public/" + user?.image} alt={"Usuário Logo"}  width="50" height="50"/> 
                    )}
                </UserIcon>
                <UserName> {user?.name != undefined ? user?.name : "Sem Nome"} </UserName>
            </DialogTrigger>
            <Portal>
                <BaseOverlay />
                <DialogContent>
                    <BaseTitle > Configurações </BaseTitle>
                    <Form onSubmit={handleSubmit(onNewUser)} method="post">
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" {...register('name')} defaultValue={user?.name} />
                            <DefaultInputError> {errors.name?.message} </DefaultInputError>

                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Email </DefaultLabel>
                            <DefaultInput type="email" {...register('email')} defaultValue={user?.email} />
                            <DefaultInputError> {errors.email?.message} </DefaultInputError>

                        </BoxInput>
                        <BoxInputFile>
                            <DefaultLabel> Imagem </DefaultLabel>
                            <DefaultInput type="file" {...register('image')} accept="image/*" onChange={preLoadImage} />
                            <BoxImagePreLoad>
                                <ImagePreLoad src={(imagePreLoadURL != "") ? imagePreLoadURL : "/defaultUser.svg"} alt={"Imagem de Perfil"} width="300" height="300" />
                            </BoxImagePreLoad>
                            <DefaultInputError> {errors.image?.message} </DefaultInputError>

                        </BoxInputFile>
                        <DefaultButton type="submit"> Salvar </DefaultButton>

                    </Form>
                </DialogContent>
            </Portal>
        </Root>
    )

}