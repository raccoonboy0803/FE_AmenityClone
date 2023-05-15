import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reserve from './pages/Reserve';
import Main from './pages/Main';
import ReserveDetail from './pages/ReserveDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/search" element={<Reserve />} />
        <Route path="/product/search/:searchId" element={<ReserveDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
