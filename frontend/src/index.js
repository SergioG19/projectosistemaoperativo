import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css'; // Puedes incluir estilos globales aquí, si los tienes

// Configuración del entorno para renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
