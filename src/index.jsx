import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'tailwindcss/tailwind.css';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
