import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import StoreContextProvider from "./src/client/context/StoreContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContextProvider>
);
