import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #736257;
        width: 100%;
        height: 100%;
        font-family: roboto. 
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body,input,textarea,select,button {
        font: 400 1rem "Roboto", sans-serif;
    }
    button {
        border: 0px;
        &:hover {
            cursor:pointer;
        }
    }

`