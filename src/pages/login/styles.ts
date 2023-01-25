import styled from "styled-components";



export const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    margin-top:10rem;
`;
export const Box = styled.div`
    background-color: ${(props) => props.theme.colors.brown300};
    height: 15rem;
    width: 40rem;
    padding: 10rem;
    align-self: center;
    align-items:center;
    justify-content:center;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    border-radius:0.5rem;

`;
export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
`

export const BoxInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`




export const Button = styled.button`
    background-color: ${(props) => props.theme.colors.brown600};
    color: ${(props) => props.theme.colors.white500};
    padding: 1rem;
    width: 10rem;
    border-radius: 0.5rem;
    border: 0px;

`   