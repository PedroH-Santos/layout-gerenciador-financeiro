
import { Box, Container } from './styles';
import { useState } from 'react';
import LoginForm from '@/components/form/login';
import NewUserForm from '@/components/form/newUser';


export default function Home() {


    const [showFormRegister, useShowFormRegister] = useState(true);

    return (
        <>
            <Container>
                <Box>
                    {(!showFormRegister) ? (
                        <LoginForm />
                    ) : (
                        <NewUserForm />
                    )}


                </Box>
            </Container>
        </>
    )

}