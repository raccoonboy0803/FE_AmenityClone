import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;

const Content = styled.div`
  /* min-height: 100vh; */
  /* margin-top: 50px; */
  margin-top: 110px;
`;
