
import { Box, BoxInput, Button, Container, Form, Input, Label } from './styles';

export default function Home() {

    function click(){
    }
    return (
        <>
            <Container>
                <Box>
                    <Form>
                        <BoxInput>
                            <Label> Email </Label>
                            <Input type="email" />
                        </BoxInput>
                        <BoxInput>
                            <Label> Senha </Label>
                            <Input type="password" />
                        </BoxInput>
                    </Form>
                    <Button type="button"> Logar </Button>
                </Box>
            </Container>
        </>
    )

}