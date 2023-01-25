
import { DefaultInput, DefaultLabel } from '@/css/default';
import { Box, BoxInput, Button, Container, Form } from './styles';

export default function Home() {

    function click(){
    }
    return (
        <>
            <Container>
                <Box>
                    <Form>
                        <BoxInput>
                            <DefaultLabel> Email </DefaultLabel>
                            <DefaultInput type="email" />
                        </BoxInput>
                        <BoxInput>
                            <DefaultLabel> Senha </DefaultLabel>
                            <DefaultInput type="password" />
                        </BoxInput>
                    </Form>
                    <Button type="submit"> Logar </Button>
                </Box>
            </Container>
        </>
    )

}