import { DefaultButton, DefaultInput, DefaultLabel } from "@/css/default";
import { BoxBreakInputs, BoxGroupSelection, BoxInput, Form, InputSelectGroup } from "./styles";
import RadixSelect from "@/components/radix/select";


export default function AccountForm() {
    const typeStatesAccount = [
        {
            "text": "Paga",
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
    const originAccount = [
        {
            "text": "Grupo",
            "value": "Grupo"
        },
        {
            "text": "Pessoal",
            "value": "Pessoal"
        }
    ]
    return (
        <Form>
            <BoxBreakInputs>
                <BoxInput>
                    <DefaultLabel> Nome </DefaultLabel>
                    <DefaultInput />
                </BoxInput>
                <BoxInput>
                    <DefaultLabel> Preço </DefaultLabel>
                    <DefaultInput />
                </BoxInput>
                <BoxInput>
                    <DefaultLabel> Data de Vencimento </DefaultLabel>
                    <DefaultInput />
                </BoxInput>
                <BoxInput>
                    <RadixSelect name="Tipo" options={typeAccount} />
                </BoxInput>
            </BoxBreakInputs>
            <BoxBreakInputs>
                <BoxInput>
                    <RadixSelect name="Origem" options={originAccount} />
                </BoxInput>
                <BoxInput>
                    <RadixSelect name="Status" options={typeStatesAccount} />
                </BoxInput>
                <BoxInput>
                    <DefaultLabel> Parcelas </DefaultLabel>
                    <DefaultInput />
                </BoxInput>
            </BoxBreakInputs>
            <BoxBreakInputs>
                <BoxGroupSelection>
                    <DefaultLabel> Grupos </DefaultLabel>
                    <InputSelectGroup />
                </BoxGroupSelection>
            </BoxBreakInputs>
            <BoxBreakInputs>
                <DefaultButton>
                    Cadastrar
                </DefaultButton>
            </BoxBreakInputs>
        </Form>
    )
}