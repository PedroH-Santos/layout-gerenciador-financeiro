import styled from "styled-components";



export const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`;
export const Box = styled.div`
    background-color: ${(props) => props.theme.colors.brown300};
    height: 15rem;
    width: 20rem;
    align-self: center;
    align-items:center;
    justify-content:center;
    display: flex;

`;