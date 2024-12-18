import ReactDOM from 'react-dom/client';
import App from './App'
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  overflow-x: hidden;
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
::-webkit-scrollbar-track {
  /*background: #404040  스크롤바 트랙(배경) 색상 */
  /* border-radius: 5px; 트랙의 둥근 모서리 */
}
::-webkit-scrollbar {
  width: 0; /* 스크롤바 너비 */
}
::-webkit-scrollbar-thumb {
   /* background: #353535;스크롤바 손잡이 색상 */
  /*border-radius: 5;  손잡이의 둥근 모서리 */
}
body {
  font-weight: 400;
  /* font-family: "Open Sans", sans-serif; */
  font-family: 'Source Sans Pro', sans-serif; 
  font-optical-sizing: auto;
  font-style: normal;
  color:${props => props.theme.white.darker};
  line-height: 1.2;
  background-color: black;font-variation-settings:
  "wdth" 100;
}
a {
  color: inherit;
  text-decoration: none;
}
`;
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const client = new QueryClient();
root.render(
<React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client = {client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
