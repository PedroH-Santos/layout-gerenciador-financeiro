import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { BoxButton, BoxHeader, BoxWallet, Icons, IconsType, InsertNewRegister, TextWallet } from "./styles";


/* 
Fazer validação do Icone
*/
export default function Home() {
    return (
        <>
            <BoxHeader>
                <BoxWallet>
                    <Icons wallet={IconsType.POSITIVE} icon={faCirclePlus} />
                    <TextWallet>R$ 1990,55</TextWallet>
                </BoxWallet>
            </BoxHeader>
            <BoxButton>
                <InsertNewRegister> Novo Registro </InsertNewRegister>
            </BoxButton>
        </>
    )
}