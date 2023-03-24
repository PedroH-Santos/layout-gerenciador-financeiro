import styled from "styled-components"

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