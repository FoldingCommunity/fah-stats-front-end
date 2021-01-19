import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// In order for style elements to be added to the DOM, a nonce attribute
// may need to be attached to the elements to adhere to a CSP requirements.
// To provide the value, you can specify the nonce value by defining a
// CSPSettings object on the page in global scope:
window.CSPSettings = {
  nonce: 'nonce',
};
