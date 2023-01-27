import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultLabel } from "@/css/default";
import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { useState } from "react";
import { BoxBreak, BoxInput, BoxOptions, DialogTrigger, Form } from "./styles";
import RadixRadio from "@/components/radix/radio";

export default function ModalRegisterInsert() {
    const [open, setOpen] = useState(false);

    return (
        <Root open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                Novo Registro
            </DialogTrigger>
            <Portal>
                <BaseOverlay />
                <BaseContent>
                    <BaseTitle >  Filtrar Lançamentos </BaseTitle>
                    <Form>
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" />
                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Preço </DefaultLabel>
                            <DefaultInput type="text" />
                        </BoxInput>
                        <BoxOptions> 
                            <DefaultLabel> Status </DefaultLabel>
                            <RadixRadio /> 
                        </BoxOptions>
                        <BoxBreak>
                            <DefaultButton type="button"> Lançar </DefaultButton>
                        </BoxBreak>
                    </Form>

                </BaseContent>
            </Portal>
        </Root>
    )
}