import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components'; // eslint-disable-line no-unused-vars

function Header() {
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
            <Logo>여기어떠니.</Logo>
            <MemberBox>
              <span>
                <FaSearch />
              </span>
              <span>예약내역</span>
              <span>로그인</span>
            </MemberBox>
          </TitleBox>
        </HeaderBox>
      ) : (
        <HeaderBoxOther>
          <TitleBox>
            <Logo style={{ color: '#de383f' }}>여기어떠니.</Logo>
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
`;

const TitleBox = styled.div`
  width: 60%;
  height: 72px;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-family: jalnan;
  font-size: 1.5rem;
  line-height: 40px;
`;

const MemberBox = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
`;
