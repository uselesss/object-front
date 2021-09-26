import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from "./store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <style>{'body { background-color: #0d1117; }'}</style>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);  
