import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import colors from 'styles/colors';

const Global = createGlobalStyle`
@font-face {
  font-family: 'Lato';
  font-weight: 400;
  font-style: normal;
  src:  local('Lato'), 
  url('assets/fonts/Lato-Regular.ttf') format('truetype');
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: Lato, sans-serif;
    font-size: 14px;
}
a {
		color: ${colors.lightBlue2};
    text-decoration: none;
    
    &:hover {
    color: ${colors.blue};
    text-decoration: underline;
    }
}
`;

ReactDOM.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
