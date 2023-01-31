import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { Container,Icon, Text } from "./styles";



type ItemProps = {
    icon: IconProp;
    text: string;
    link: string;
}

export default function Item({ icon , text, link }: ItemProps){
    return (
        <Container href={link}>
            <Icon icon={icon} />
            <Text> {text } </Text>
        </Container>
    )

}