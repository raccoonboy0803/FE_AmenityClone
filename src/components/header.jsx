import React from 'react';
import { FaSearch } from "react-icons/fa";
import styled from 'styled-components'; // eslint-disable-line no-unused-vars

function Header() {
  return (
    <HeaderBox>
      <TitleBox>
        <Logo>여기어떠니.</Logo>
        <MemberBox>
            <span><FaSearch /></span>
            <span>예약내역</span>
            <span>로그인</span>
        </MemberBox>
      </TitleBox>
    </HeaderBox>
  );
}

export default Header;

const HeaderBox = styled.div`
  width: 100%;
  height: 72px;
  background-color: #de383f;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.div`
  width: 70%;
  height: 72px;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.h1`
    font-family: jalnan;
`

const MemberBox = styled.div`
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1rem;
`