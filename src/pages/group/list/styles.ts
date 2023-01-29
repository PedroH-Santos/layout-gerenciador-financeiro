import styled from "styled-components"




export const Body = styled.div`
    width: 80%;
    height: auto;
`


export const BoxTileAndActions = styled.div`
    margin-top: 3rem; 
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`

export const TextTitle = styled.h1`
    color: ${(props) => props.theme.colors.white500};
`
export const BoxButton = styled.div`
    display:flex;
    gap: 2rem;
`
