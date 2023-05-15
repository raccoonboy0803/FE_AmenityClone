import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reserve from '../pages/Reserve';
import Main from '../pages/Main';
import Login from '../pages/Login';
import ReserveDetail from '../pages/ReserveDetail';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/search" element={<Reserve />} />
          <Route path="/product/search/:searchId" element={<ReserveDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
