import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createGlobalStyle} from "styled-components";

const Global = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
}
`

ReactDOM.render(
	<React.StrictMode>
		<Global/>
		<App/>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
