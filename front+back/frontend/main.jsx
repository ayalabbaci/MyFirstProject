import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import StoreContextProvider from "./src/client/context/StoreContext.jsx";
import Modal from 'react-modal';

const rootElement = document.getElementById('root');
Modal.setAppElement(rootElement); // ✅ أفضل من كتابة السلسلة مباشرة

ReactDOM.createRoot(rootElement).render(
  <StoreContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContextProvider>
);
