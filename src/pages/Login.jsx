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
      <st.SignBox>
        <st.Logo onClick={() => navigate('/')} style={{ color: '#de383f' }}>
          여기어떠니.
        </st.Logo>

        <st.SignButton type="kakao">
          <st.SignP type="kakao">
            <BsFillChatFill /> 카카오톡으로 로그인
          </st.SignP>
        </st.SignButton>

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

        <st.SignButton type="sign">
          <st.SignP type="sign">로그인</st.SignP>
        </st.SignButton>

        <div style={{ height: '25px' }}></div>
        <st.SignP style={{cursor: 'pointer'}} onClick={() => navigate('/signup')}>회원가입</st.SignP>
      </st.SignBox>
    </st.Background>
  );
}

export default Login;

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
