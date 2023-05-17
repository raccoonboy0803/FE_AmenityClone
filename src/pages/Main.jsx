import React from 'react';
import styled from 'styled-components';
import mainImage from '../images/mainspot_2305.png';
import appimage from '../images/bg_appdown.png';
import google from '../images/gooleplay.png';
import apple from '../images/appstore.png';
import NavIcons from './main/NavIcons';
import * as st from '../shared/styles';
import Carousel from './main/Carousel';

function Main() {
  const mainImgClick = () => {
    alert('모바일 앱에서만 다운로드가 가능합니다!');
  };

  return (
    <>
      <st.Background>
        <MainImage />
        <NavIcons />
        <AppImage>
          <p className="AppP">
            앱 다운 받고{' '}
            <span style={{ fontWeight: 'bold' }}>더 많은 혜택</span> 받으세요
          </p>
          <st.Row onClick={mainImgClick}>
            <AppDown app="google" />
            <AppDown app="apple" />
          </st.Row>
        </AppImage>
        <Carousel />
      </st.Background>
    </>
  );
}

export default Main;

const MainImage = styled.div`
  width: 930px;
  height: 480px;
  background-color: skyblue;
  background-image: url(${mainImage});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const AppImage = styled.div`
  width: 930px;
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
  width: 180px;
  height: 70px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${(props) =>
    props.app === 'google' ? `${google}` : `${apple}`});
  cursor: pointer;
`;
