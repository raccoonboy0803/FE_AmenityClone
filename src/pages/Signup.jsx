import React, { useState, useEffect } from 'react';
import './Sign.css';
import styled from 'styled-components';
import * as st from '../shared/styles';
import { useNavigate } from 'react-router-dom';

function Signup() {

  let navigate = useNavigate()
  
  const EMAIL_REGEX =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const PWD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,24}$/;

  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(false);

  const [matchPw, setMatchPw] = useState('');
  const [isMatchPw, setIsMatchPw] = useState(false);

  const [nickname, setNickname] = useState('')

  useEffect(() => {
    setIsEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setIsPassword(PWD_REGEX.test(password));
    setIsMatchPw(password === matchPw);
  }, [password, matchPw]);

  return (
    <st.Background>
      <st.SignBox style={{ height: '760px' }}>
        <st.Logo onClick={() => navigate('/')} style={{ color: '#de383f' }}>
          여기어떠니.
        </st.Logo>

        <st.SignP style={{ color: 'black' }}>회원가입</st.SignP>

        <SignupBox>
          <st.SignP>이메일 아이디</st.SignP>
          <Input
            placeholder="이메일 주소를 입력해주세요."
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={isEmail ? 'false' : 'true'}
            aria-describedby="emailnote"
          />
          <p id="emailnote" className={email && !isEmail ? 'errmsg' : 'none'}>
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
            value={password}
            required
            aria-invalid={isPassword ? 'false' : 'true'}
            aria-describedby="pwnote"
          />
          <p
            id="pwnote"
            className={password && !isPassword ? 'errmsg' : 'none'}
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
          <Input placeholder="닉네임을 입력해주세요."
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)} />
        </SignupBox>

        <st.SignButton type="sign">
          <st.SignP type="sign">가입하기</st.SignP>
        </st.SignButton>
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
