import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Rubik', sans-serif;
    }
    html {
        font-size: 62.5%;
        overflow-y: scroll;
    }
    body {
        min-height: 100vh;
        width: 100%;
    }
    img {
        width: 100%;
    }
    button {
        border: 0;
        background-color: transparent;
        cursor: pointer;
    }
    li {
        list-style: none;
    }
    a {
        text-decoration: none;
    }
    input {
        border: 0;
        outline: 0;
        background-color: transparent;
    }
`
