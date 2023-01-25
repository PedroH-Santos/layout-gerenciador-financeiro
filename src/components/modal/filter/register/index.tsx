import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import {  BoxInput, Button, FilterIcon, Form } from "./styles";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultLabel } from "@/css/default";


export default function ModalRegisterFilter() {
    const [open, setOpen] = useState(false);


    function onBack() {
        setOpen(false);
    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <BaseTrigger>
                <Button>
                    <FilterIcon icon={faFilter}  />
                    Filtros
                </Button>
            </BaseTrigger>
            <Portal>
                <BaseOverlay />
                <BaseContent>
                    <BaseTitle >  Filtrar Lançamentos </BaseTitle>
                    <Form>
                        <BoxInput>
                            <DefaultLabel> Data de Lançamento </DefaultLabel>
                            <DefaultInput type="text" />
                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" />
                        </BoxInput>
                        <DefaultButton type="button"> Filtrar </DefaultButton>
                    </Form>

                </BaseContent>
            </Portal>
        </Root>
    );
};
