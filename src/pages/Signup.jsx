import React, { useState, useEffect } from 'react';
import './Sign.css';
import styled from 'styled-components';
import * as st from '../shared/styles';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function Signup() {
  let navigate = useNavigate();

  const EMAIL_REGEX =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const SIGNUP_URL = '/api/user/signup';

  const [userEmail, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const [userPassword, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(false);

  const [matchPw, setMatchPw] = useState('');
  const [isMatchPw, setIsMatchPw] = useState(false);

  const [userNickNm, setNickname] = useState('');

  useEffect(() => {
    setIsEmail(EMAIL_REGEX.test(userEmail));
  }, [userEmail]);

  useEffect(() => {
    setIsPassword(PWD_REGEX.test(userPassword));
    setIsMatchPw(userPassword === matchPw);
  }, [userPassword, matchPw]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(userEmail);
    const v2 = PWD_REGEX.test(userPassword);
    if (!v1 || !v2) {
      alert('이메일과 비밀번호를 확인해주세요');
      return;
    }
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ userEmail, userPassword, userNickNm, userRole: 'string', adminToken: 'string' }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      console.log(JSON.stringify(response?.data));
      navigate('/login')
    } catch (err) {
      if (!err?.response) {
        alert('서버의 응답이 없습니다');
      } else if (err.response?.status === 409) {
        alert('이미 가입된 이메일입니다');
      } else {
        alert('연결이 끊겼습니다');
      }
    }
  };

  return (
    <st.Background>
      <st.SignBox style={{ height: '760px' }}>
        <st.Logo onClick={() => navigate('/')} style={{ color: '#de383f' }}>
          여기어떠니.
        </st.Logo>

        <st.SignP style={{ color: 'black' }}>회원가입</st.SignP>
        <form onSubmit={handleSubmit}>
          <SignupBox>
            <st.SignP>이메일 아이디</st.SignP>
            <Input
              placeholder="이메일 주소를 입력해주세요."
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={userEmail}
              required
              aria-invalid={isEmail ? 'false' : 'true'}
              aria-describedby="emailnote"
            />
            <p
              id="emailnote"
              className={userEmail && !isEmail ? 'errmsg' : 'none'}
            >
              이메일 주소를 확인해주세요.
            </p>
          </SignupBox>

          <SignupBox>
            <st.SignP>비밀번호</st.SignP>
            <Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={userPassword}
              required
              aria-invalid={isPassword ? 'false' : 'true'}
              aria-describedby="pwnote"
            />
            <p
              id="pwnote"
              className={userPassword && !isPassword ? 'errmsg' : 'none'}
            >
              사용불가 : 최소 8자 이상 입력해주세요.
            </p>
          </SignupBox>

          <SignupBox>
            <st.SignP>비밀번호 확인</st.SignP>
            <Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              id="matchPw"
              onChange={(e) => setMatchPw(e.target.value)}
              value={matchPw}
              required
              aria-invalid={isMatchPw ? 'false' : 'true'}
              aria-describedby="matchnote"
            />
            <p id="matchnote" className={!isMatchPw ? 'errmsg' : 'none'}>
              비밀번호가 일치하지 않습니다.
            </p>
          </SignupBox>

          <SignupBox>
            <st.SignP>닉네임</st.SignP>
            <Input
              placeholder="닉네임을 입력해주세요."
              id="nickname"
              value={userNickNm}
              onChange={(e) => setNickname(e.target.value)}
            />
          </SignupBox>

          <st.SignButton
            disabled={!isEmail || !isPassword || !isMatchPw ? true : false}
            type="sign"
          >
            <st.SignP type="sign">가입하기</st.SignP>
          </st.SignButton>
        </form>
      </st.SignBox>
    </st.Background>
  );
}

export default Signup;

const SignupBox = styled.div`
  width: 330px;
  height: 110px;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 330px;
  height: 50px;
  margin-top: 10px;
  border: 1px solid silver;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  ::placeholder {
    font-size: 1rem;
    color: silver;
  }
`;
