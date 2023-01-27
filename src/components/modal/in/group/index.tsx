import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { BoxInput, Button, DialogContent, FilterIcon, Form, Input } from "./styles";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultLabel } from "@/css/default";


export default function ModalGroupIn() {
    const [open, setOpen] = useState(false);


    function onBack() {
        setOpen(false);
    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <BaseTrigger>
                <Button>
                    Entrar em Grupo
                </Button>
            </BaseTrigger>
            <Portal >
                <BaseOverlay />
                <DialogContent>
                    <BaseTitle >  Entrar no Grupo  </BaseTitle>
                    <Form>
                        <BoxInput>
                            <DefaultLabel> Código do Grupo </DefaultLabel>
                            <Input type="text" />
                        </BoxInput>
                        <DefaultButton type="button"> Entrar </DefaultButton>
                    </Form>

                </DialogContent>
            </Portal>
        </Root>
    );
};
