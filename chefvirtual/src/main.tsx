import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter deve permanecer aqui
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* FORNCE UM AMBIENTE DE NAVEGAÇÃO PARA O APP */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
