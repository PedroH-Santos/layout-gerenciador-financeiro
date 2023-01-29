import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultLabel } from "@/css/default";
import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { useState } from "react";
import { BoxBreak, BoxInput, BoxOptions, DialogTrigger, Form } from "./styles";
import RadixRadio from "@/components/radix/radio";

export default function ModalGroupInsert() {
    const [open, setOpen] = useState(false);

    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                Novo Grupo
            </DialogTrigger>
            <Portal>
                <BaseOverlay />
                <BaseContent>
                    <BaseTitle >  Cadastrar Grupo </BaseTitle>
                    <Form>
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" />
                        </BoxInput>
                        <BoxBreak>
                            <DefaultButton type="button"> Cadastrar </DefaultButton>
                        </BoxBreak>
                    </Form>

                </BaseContent>
            </Portal>
        </Root>
    )
}