import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import mainImage from '../images/mainspot_2305.png';
import appimage from '../images/bg_appdown.png';
import google from '../images/gooleplay.png';
import apple from '../images/appstore.png';
import NavIcons from './main/NavIcons';
import * as st from '../shared/styles';
import Carousel from './main/Carousel';

function Main() {
  return (
    <>
      <Header />
      <MainBackground>
        <MainImage />
        <NavIcons />
        <AppImage>
          <p className="AppP">
            앱 다운 받고{' '}
            <span style={{ fontWeight: 'bold' }}>더 많은 혜택</span> 받으세요
          </p>
          <st.Row>
            <AppDown app="google" />
            <AppDown app="apple" />
          </st.Row>
        </AppImage>
        <Carousel />
      </MainBackground>
    </>
  );
}

export default Main;

const MainBackground = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.div`
  margin-top: 110px;
  width: 60%;
  height: 460px;
  background-image: url(${mainImage});
  background-size: cover;
  cursor: pointer;
`;

const AppImage = styled.div`
  width: 60%;
  height: 300px;
  background-image: url(${appimage});
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .AppP {
    font-size: 1.7rem;
    letter-spacing: -1.5px;
  }
`;

const AppDown = styled.div`
  width: 200px;
  height: 70px;
  background-image: url(${(props) =>
    props.app === 'google' ? `${google}` : `${apple}`});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;
