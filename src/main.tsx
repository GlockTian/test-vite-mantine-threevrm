import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { VRMProvider } from './canva/VRMContextProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <VRMProvider>
      <App />
    </VRMProvider>
  </React.StrictMode>
);
