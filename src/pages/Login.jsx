import React from 'react';
import styled from 'styled-components';
import * as st from '../shared/styles';
import { BsFillChatFill } from 'react-icons/bs';

function Login() {
  return (
    <st.Background>
      <LoginBox>
        <st.Logo style={{ color: '#de383f' }}>여기어떠니.</st.Logo>
        <KakaoLogin>
          <KakaoP>
            <BsFillChatFill /> 카카오톡으로 로그인
          </KakaoP>
        </KakaoLogin>
        <MiddleLine />
      </LoginBox>
    </st.Background>
  );
}

export default Login;

const LoginBox = styled.div`
  box-sizing: border-box;
  padding-top: 100px;
  width: 500px;
  height: 700px;
  /* background-color: skyblue; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const KakaoLogin = styled.div`
  width: 330px;
  height: 60px;
  margin-top: 20px;
  background-color: #F7E600;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KakaoP = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #3A1D1D;
`;

const MiddleLine = styled.div`
    width: 330px;
    border: 0.5px solid #eceaea;
    margin-top: 40px;
`

const MiddleText = st