import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as st from '../shared/styles';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useQuery, useQueryClient } from 'react-query';
import { useCookies } from 'react-cookie';

function Mypage() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userEmail') === null) {
      alert('로그인 후에 이용 가능합니다.');
      navigate('/login');
    }
  });

  return (
    <>
      <MyInfoBox>
        <MyInfo>
          <MyInfoH>내정보</MyInfoH>
        </MyInfo>
      </MyInfoBox>

      <st.Background>
        <MypageBg>
          <LeftMenu>
            <Text>포인트</Text>
            <Text>쿠폰함</Text>
            <Text reserve="reserve">예약 내역</Text>
            <Text>내 정보 관리</Text>
            <Text>알림</Text>
            <Text>여기어때 상품권 잔액 조회</Text>
          </LeftMenu>
          <NotInfo>
            <Text notfound="notfound">예약 내역이 없습니다.</Text>
            <TextCenter>
              <Text>최저가로 예약 가능한</Text>
              <Text>숙소들을 지금 만나세요!</Text>
            </TextCenter>
            <MoreBtn onClick={() => navigate('/product/search')}>
              다양한 숙소 보러가기
            </MoreBtn>
          </NotInfo>
        </MypageBg>
      </st.Background>
    </>
  );
}

export default Mypage;

const MyInfoBox = styled.div`
  width: 100%;
  height: 200px;
  background-color: #de383f;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -80px;
`;

const MyInfo = styled.div`
  width: 930px;
  height: 200px;
`;

const MyInfoH = styled.h1`
  color: white;
  line-height: 200px;
`;

const MypageBg = styled.div`
  width: 930px;
  height: 800px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
`;

const LeftMenu = styled.div`
  width: 250px;
  height: 800px;
`;

const NotInfo = styled.div`
  width: 630px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: ${(props) => (props.notfound ? '1.1' : '1')}rem;
  color: ${(props) =>
    props.reserve ? '#de383f' : props.notfound ? 'black' : 'gray'};
  font-weight: bold;
`;

const TextCenter = styled.div`
  line-height: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MoreBtn = styled.button`
  width: 200px;
  height: 50px;
  border: 2px solid #de383f;
  background-color: white;
  color: #de383f;
  font-size: 0.95rem;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
`;
