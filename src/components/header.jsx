import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as st from '../shared/styles'

function Header() {

  let navigate = useNavigate()

  const [scroll, setScroll] = useState(0);
  const updateScroll = () => {
    setScroll(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });

  return (
    <>
      {scroll < 10 ? (
        <HeaderBox>
          <TitleBox>
            <st.Logo onClick={() => navigate('/')}>여기어떠니.</st.Logo>
            <MemberBox>
              <MemberNav>
                <FaSearch />
              </MemberNav>
              <MemberNav>예약내역</MemberNav>
              <MemberNav onClick={() => navigate('/login')}>로그인</MemberNav>
            </MemberBox>
          </TitleBox>
        </HeaderBox>
      ) : (
        <HeaderBoxOther>
          <TitleBox>
            <st.Logo style={{color: '#de383f'}}>여기어떠니.</st.Logo>
            <MemberBox>
              <span>
                <FaSearch />
              </span>
              <span>예약내역</span>
              <span>로그인</span>
            </MemberBox>
          </TitleBox>
        </HeaderBoxOther>
      )}
    </>
  );
}

export default Header;

const HeaderBox = styled.div`
  position: fixed;
  width: 100%;
  height: 72px;
  background-color: #de383f;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const HeaderBoxOther = styled.div`
  position: fixed;
  width: 100%;
  height: 72px;
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 4px 13px -4px #d0d0d0;
  box-shadow: 0px 4px 13px -4px #d0d0d0;
  z-index: 10;
`;

const TitleBox = styled.div`
  width: 980px;
  height: 72px;
  display: flex;
  justify-content: space-between;
`;

const MemberBox = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
`;

const MemberNav = styled.span`
  cursor: pointer;
`