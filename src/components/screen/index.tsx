import { ReactNode } from "react"
import { Container } from "./styles";


type BodyProps = {
    children: ReactNode;
}


export default function Screen({children} : BodyProps){
    return (
        <Container>
            {children}
        </Container>
        
    )

}