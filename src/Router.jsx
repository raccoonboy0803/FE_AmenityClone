import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reserve from './pages/Reserve';
import Main from './pages/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/search" element={<Reserve />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
