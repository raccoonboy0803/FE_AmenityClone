import React, { useState, useEffect } from 'react';
import './Sign.css';
import styled from 'styled-components';
import * as st from '../shared/styles';
import { BsFillChatFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login() {

  let navigate = useNavigate();

  const EMAIL_REGEX =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const PWD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,24}$/;

  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    setIsEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setIsPassword(PWD_REGEX.test(password));
  }, [password]);

  return (
    <st.Background>
      <LoginBox>
        <st.Logo onClick={() => navigate('/')} style={{ color: '#de383f' }}>
          여기어떠니.
        </st.Logo>

        <SignButton type="kakao">
          <SignP type="kakao">
            <BsFillChatFill /> 카카오톡으로 로그인
          </SignP>
        </SignButton>

        <MiddleLine />
        <MiddleText>또는</MiddleText>

        <div className={email && !isEmail ? 'focus' : 'signInputBox'}>
          <MdEmail className="icon" />
          <SignInput
            placeholder="이메일 주소"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={isEmail ? 'false' : 'true'}
            aria-describedby="emailnote"
          />
        </div>
        <p id="emailnote" className={email && !isEmail ? 'errmsg' : 'none'}>
          이메일 주소를 입력해주세요.
        </p>

        <div className={password && !isPassword ? 'focus' : 'signInputBox'}>
          <FaLock style={{ fontSize: '1.3rem' }} className="icon" />
          <SignInput
            placeholder="비밀번호"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            aria-invalid={isPassword ? 'false' : 'true'}
            aria-describedby="pwnote"
          />
        </div>
        <p id="emailnote" className={password && !isPassword ? 'errmsg' : 'none'}>
          비밀번호를 입력해주세요.
        </p>

        <SignButton type="sign">
          <SignP type="sign">로그인</SignP>
        </SignButton>

        <div style={{ height: '25px' }}></div>
        <SignP>회원가입</SignP>
      </LoginBox>
    </st.Background>
  );
}

export default Login;

const LoginBox = styled.div`
  box-sizing: border-box;
  padding-top: 100px;
  width: 330px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignButton = styled.div`
  width: 330px;
  height: 60px;
  margin-top: 20px;
  background-color: ${(props) =>
    props.type === 'kakao' ? '#F7E600' : '#de383f'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SignP = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) =>
    props.type === 'kakao'
      ? '#3A1D1D'
      : props.type === 'sign'
      ? 'white'
      : 'gray'};
  cursor: pointer;
`;

const MiddleLine = styled.div`
  width: 330px;
  border: 0.5px solid #eceaea;
  margin-top: 40px;
  position: relative;
  margin-bottom: 30px;
`;

const MiddleText = styled.div`
  width: 50px;
  height: 30px;
  background-color: white;
  position: absolute;
  top: 285px;
  color: silver;
  font-weight: bolder;
  text-align: center;
  line-height: 30px;
`;

const SignInput = styled.input`
  width: 270px;
  height: 30px;
  margin-left: 10px;
  border: none;
  font-size: 1.1rem;
  ::placeholder {
    color: silver;
  }
  &:focus {
    outline: none;
  }
`;
