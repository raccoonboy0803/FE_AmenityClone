import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import motel from '../../images/ico_category_01.png';
import hotel from '../../images/ico_category_02.png';
import pension from '../../images/ico_category_03.png';
import guest from '../../images/ico_category_04.png';
import camping from '../../images/ico_category_05.png';
import travle from '../../images/ico_category_09.png';

function NavIcons() {
  const navigate = useNavigate();
  const hotelHandle = () => {
    navigate('/product/search');
  };
  return (
    <NavBox>
      <NavIcon>
        <ImgBox name="motel" />
        <NavText>모텔</NavText>
      </NavIcon>
      <NavIcon>
        <ImgBox name="hotel" onClick={hotelHandle} />
        <NavText>호텔·리조트</NavText>
      </NavIcon>
      <NavIcon>
        <ImgBox name="pension" />
        <NavText>펜션</NavText>
      </NavIcon>
      <NavIcon>
        <ImgBox name="guest" />
        <NavText>게스트하우스</NavText>
      </NavIcon>
      <NavIcon>
        <ImgBox name="camping" />
        <NavText>캠핑·글램핑</NavText>
      </NavIcon>
      <NavIcon>
        <ImgBox name="travle" />
        <NavText>해외 여행</NavText>
      </NavIcon>
    </NavBox>
  );
}

export default NavIcons;

const NavBox = styled.div`
  width: 930px;
  height: 200px;
  display: flex;
  box-sizing: border-box;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

const NavIcon = styled.div`
  width: 120px;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) =>
    props.name === 'motel'
      ? `${motel}`
      : (props) =>
          props.name === 'hotel'
            ? `${hotel}`
            : (props) =>
                props.name === 'pension'
                  ? `${pension}`
                  : (props) =>
                      props.name === 'guest'
                        ? `${guest}`
                        : (props) =>
                            props.name === 'camping'
                              ? `${camping}`
                              : `${travle}`});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const NavText = styled.span`
  font-size: 1.1rem;
  color: gray;
`;
