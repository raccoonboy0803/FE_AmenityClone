import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'tailwindcss/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
