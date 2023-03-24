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
    height: auto;
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
