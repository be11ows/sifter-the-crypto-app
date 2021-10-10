import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  
  document.getElementById('root')
);


