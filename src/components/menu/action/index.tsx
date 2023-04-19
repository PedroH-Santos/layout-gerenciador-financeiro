import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { Container,Icon, Text } from "./styles";



type ItemProps = {
    icon: IconProp;
    text: string;
    action: Function;
}

export default function Action({ icon , text, action }: ItemProps){

    async function onAction(){
        action();
    }

    return (
        <Container href="" onClick={onAction}>
            <Icon icon={icon} />
            <Text> {text } </Text>
        </Container>
    )

}