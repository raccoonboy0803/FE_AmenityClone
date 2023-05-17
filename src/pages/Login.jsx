import React, { useState, useEffect } from 'react';
import './Sign.css';
import styled from 'styled-components';
import * as st from '../shared/styles';
import { BsFillChatFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../api/axios';

function Login() {
  const LOGIN_URL = '/api/user/login';

  let navigate = useNavigate();

  const EMAIL_REGEX =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const PWD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,24}$/;

  const [userEmail, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const [userPassword, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    setIsEmail(EMAIL_REGEX.test(userEmail));
  }, [userEmail]);

  useEffect(() => {
    setIsPassword(PWD_REGEX.test(userPassword));
  }, [userPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          userEmail,
          userPassword,
          userRole: 'string',
          adminToken: 'string',
          userNickNm: 'string',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      console.log(JSON.stringify(response?.data));

      const accessHeader = response.headers.access_key;
      const accessToken = accessHeader.split(' ')[1];
      Cookies.set('accessToken', accessToken);
      const refreshHeader = response.headers.refresh_key;
      const refreshToken = refreshHeader.split(' ')[1];
      Cookies.set('refreshToken', refreshToken);
      localStorage.setItem('userEmail', response?.headers.user_email);
      navigate('/');
      // console.log(response?.headers);
      // console.log(response?.headers.access_key);
      if (response?.data.msg === '없는 이메일 입니다.') {
        alert('회원 정보가 없습니다. 회원가입 페이지로 이동합니다.');
        navigate('/signup');
      } else if (response?.data.msg === '비밀번호를 확인해주세요!!') {
        alert('비밀번호를 확인해주세요.');
        navigate('/login');
        setPassword('');
      }
    } catch (err) {
      if (!err?.response) {
        alert('서버의 응답이 없습니다');
      } else {
        alert('로그인에 실패했습니다');
      }
    }
  };

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

        <form onSubmit={handleSubmit}>
          <div className={userEmail && !isEmail ? 'focus' : 'signInputBox'}>
            <MdEmail className="icon" />
            <SignInput
              placeholder="이메일 주소"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={userEmail}
              required
              aria-invalid={isEmail ? 'false' : 'true'}
              aria-describedby="emailnote"
            />
          </div>
          <p
            id="emailnote"
            className={userEmail && !isEmail ? 'errmsg' : 'none'}
          >
            이메일 주소를 입력해주세요.
          </p>

          <div
            className={userPassword && !isPassword ? 'focus' : 'signInputBox'}
          >
            <FaLock style={{ fontSize: '1.3rem' }} className="icon" />
            <SignInput
              placeholder="비밀번호"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={userPassword}
              required
              aria-invalid={isPassword ? 'false' : 'true'}
              aria-describedby="pwnote"
            />
          </div>
          <p
            id="emailnote"
            className={userPassword && !isPassword ? 'errmsg' : 'none'}
          >
            비밀번호를 입력해주세요.
          </p>

          <st.SignButton type="sign">
            <st.SignP type="sign">로그인</st.SignP>
          </st.SignButton>
        </form>

        <div style={{ height: '25px' }}></div>
        <st.SignP
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/signup')}
        >
          회원가입
        </st.SignP>
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
  top: 390px;
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

const MiddleBox = styled.div`
  width: 330px;
  height: 30px;
  display: flex;
  justify-content: center;
  position: relative;
`;
