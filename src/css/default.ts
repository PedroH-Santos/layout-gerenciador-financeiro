import styled from "styled-components";



export const DefaultButton = styled.button`
    background-color: ${(props) => props.theme.colors.brown600};
    color: ${(props) => props.theme.colors.white500};
    padding: 1rem 3rem;
    border-radius:0.5rem;
    text-align: center;
    transition: all 0.3s ease-in-out;
    &:hover {
        opacity: 0.8;
    }

`