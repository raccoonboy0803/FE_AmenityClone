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
          <Route path="/api/amenity/:amenityType" element={<Reserve />} />
          {/* <Route path="/api/amenity/1" element={<Reserve />} /> */}
          {/* <Route path="/api/amenity/1" element={<Reserve />} /> */}
          <Route
            path="/api/amenity/detail/:amenityId"
            element={<ReserveDetail />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
