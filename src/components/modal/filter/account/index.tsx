import { Root, Trigger, Portal } from "@radix-ui/react-dialog";
import { BoxInput, Button, FilterIcon, Form } from "./styles";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseContent, BaseOverlay, BaseTitle, BaseTrigger } from "../../base/styles";
import { DefaultButton, DefaultInput, DefaultLabel } from "@/css/default";
import RadixSelect from "@/components/radix/select";


export default function ModalAccountFilter() {
    const [open, setOpen] = useState(false);
    const typeStatesAccount = [
        {
            "text" : "Paga",
            "value": "Paga"
        },
        {
            "text": "Atrasada",
            "value": "Atrasada"
        },
        {
            "text": "Aguardando Pagamento",
            "value": "Aguardando"
        }
    ] 
    const typeAccount = [
        {
            "text": "Recorrente",
            "value": "Recorrente"
        },
        {
            "text": "Parcelada",
            "value": "Parcelada"
        }
    ] 
    function onBack() {
        setOpen(false);
    }

    return (
        <Root open={open} onOpenChange={setOpen}>
            <BaseTrigger>
                <Button>
                    <FilterIcon icon={faFilter} />
                    Filtros
                </Button>
            </BaseTrigger>
            <Portal>
                <BaseOverlay />
                <BaseContent>
                    <BaseTitle >  Filtrar Contas </BaseTitle>
                    <Form>
                        <BoxInput>
                            <DefaultLabel> Data de Vencimento </DefaultLabel>
                            <DefaultInput type="text" />
                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Nome </DefaultLabel>
                            <DefaultInput type="text" />
                        </BoxInput>
                        <BoxInput>
                            <RadixSelect name="Status" options={typeStatesAccount}/> 
                        </BoxInput>
                        <BoxInput>
                            <RadixSelect name="Tipo" options={typeAccount} /> 
                        </BoxInput>
                        <DefaultButton type="button"> Filtrar </DefaultButton>
                    </Form>

                </BaseContent>
            </Portal> 
        </Root>
    );
};
