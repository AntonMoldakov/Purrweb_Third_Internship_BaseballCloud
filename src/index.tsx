import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import colors from 'styles/colors';
import { BrowserRouter } from 'react-router-dom';

const Global = createGlobalStyle`
@font-face {
  font-family: 'Lato';
  font-weight: 400;
  font-style: normal;
  src:  local('Lato'), 
  url('assets/fonts/Lato-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'Lato-Bold';
  font-weight: 700;
  font-style: normal;
  src:  local('Lato-Bold'), 
  url('assets/fonts/Lato-Bold.ttf') format('truetype');
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    color: ${colors.darkGray};
    font-family: Lato, sans-serif;
    font-size: 16px;
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
    <BrowserRouter>
      <Global />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
