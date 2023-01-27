import styled from "styled-components";




export const Container = styled.div`
    height:100vh;
    width:200px;
    background-color: ${(props) => props.theme.colors.brown300};
    display: flex;
    flex-direction: column;
    gap: 1rem;

`


export const BoxIcon = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    gap: 1rem;
`

export const BoxItems = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap: 1rem;
`



