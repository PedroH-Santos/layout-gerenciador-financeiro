import { useState } from "react";
import { BaseOverlay, BaseTrigger, BaseTitle } from "../base/styles";
import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { UserIcon, UserName, DialogTrigger, BoxInput, DialogContent, BoxUpload, UserIconConfig, Form } from "./styles";
import { DefaultButton, DefaultIcon, DefaultInput, DefaultLabel } from "@/css/default";
import { faFileEdit } from "@fortawesome/free-solid-svg-icons";


type ModalConfigurationProps = {
    name: string;
}


export default function ModalConfiguration({ name }: ModalConfigurationProps) {
    const [open, setOpen] = useState(false);

    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <UserIcon />
                <UserName> {name} </UserName>
            </DialogTrigger>
            <Portal>
                <BaseOverlay />
                <DialogContent>
                    <BaseTitle > Configurações </BaseTitle>
                    <Form>
                        <BoxUpload>
                            <UserIconConfig>
                                <DefaultIcon icon={faFileEdit} />
                            </UserIconConfig>
                        </BoxUpload>

                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" />
                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Email </DefaultLabel>
                            <DefaultInput type="text" />
                        </BoxInput>
                        <DefaultButton type="button"> Salvar </DefaultButton>
                    </Form>
                </DialogContent>
            </Portal>
        </Root>
    )

}