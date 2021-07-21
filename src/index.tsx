import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import colors from 'styles/colors';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

const Global = createGlobalStyle`
@font-face {
  font-family: 'Lato';
  font-weight: 400;
  font-style: normal;
  src: 
  url('assets/fonts/Lato-Regular.ttf') format('ttf');
}
@font-face {
  font-family: 'Lato-Bold';
  font-weight: 700;
  font-style: normal;
  src: 
  url('assets/fonts/Lato-Bold.ttf') format('ttf');
}
@font-face {
  font-family: 'Lato-Black';
  font-weight: 700;
  font-style: normal;
  src:
  url('assets/fonts/Lato-Black.ttf') format('ttf');
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
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
