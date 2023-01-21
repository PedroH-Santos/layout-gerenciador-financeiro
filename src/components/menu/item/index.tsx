import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { Container,Icon, Text } from "./styles";



type ItemProps = {
    icon: IconProp;
    text: string;
}

export default function Item({ icon , text }: ItemProps){
    return (
        <Container>
            <Icon icon={icon} />
            <Text> {text } </Text>
        </Container>
    )

}