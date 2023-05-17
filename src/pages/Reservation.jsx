import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import * as st from '../shared/styles';
import SelectPayment from './reservation/SelectPayment';
import CheckedAgree from './reservation/CheckedAgree';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { reserveData, reserverT, roomIdcheck } from '../shared/atoms';

function Reservation() {
  let navigate = useNavigate();

  const [reserveD, setReserveD] = useRecoilState(reserverT); //해당 숙소 데이터
  const [roomid, setRoomid] = useRecoilState(roomIdcheck); //룸 id

  useEffect(() => {
    if (localStorage.getItem('userEmail') === null) {
      alert('로그인 후에 이용 가능합니다.');
      navigate('/login');
    }
  });
  return (
    <>
      <Header />
      <st.Background>
        <ReservBox>
          <ReservInfo>
            <ReservP title="title">예약자 정보</ReservP>
            <div style={{ marginTop: '40px' }}></div>
            <ReservP>예약자 이름</ReservP>
            <Input placeholder="체크인시 필요한 정보입니다." />
            <ReservP>이메일 주소</ReservP>
            <Input placeholder="체크인시 필요한 정보입니다." />
            <div style={{ height: '50px' }}></div>
            <ReservP title="title">결제수단 선택</ReservP>
            <SelectPayment />
            <CheckedAgree />
          </ReservInfo>

          <ReservPay>
            <PayBox>
              <ReservP>숙소이름</ReservP>
              <ReservP pay="pay">보코서울강남, IHG 호텔</ReservP>
            </PayBox>
            <PayBox>
              <ReservP>객실타입/기간</ReservP>
              <ReservP pay="pay">
                [무료 미니바 패키지] 디럭스 싱글 / 1박
              </ReservP>
            </PayBox>

            <PayBox>
              <ReservP>체크인</ReservP>
              <ReservP pay="pay">05.15 월 15:00</ReservP>
            </PayBox>

            <PayBox>
              <ReservP>체크아웃</ReservP>
              <ReservP pay="pay">05.16 화 12:00</ReservP>
            </PayBox>

            <PayLine></PayLine>

            <PayBox>
              <ReservP pay="pay" style={{ fontWeight: 'bold' }}>
                총 결제 금액
                <span style={{ fontSize: '1rem', fontWeight: '100' }}>
                  (VAT 포함)
                </span>
              </ReservP>
              <span
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#de383f',
                }}
              >
                273,900원
              </span>
              <div style={{ height: '20px' }}></div>
            </PayBox>
            <li style={{ color: 'gray' }}>
              해당 객실가는 세금, 봉사료가 포함된 금액입니다
            </li>
            <li style={{ color: 'gray' }}>
              결제완료 후 <span style={{ color: '#de383f' }}>예약자 이름</span>
              으로 바로 <span style={{ color: '#de383f' }}>체크인</span> 하시면
              됩니다
            </li>
            <st.SignButton type="sign">
              <st.SignP type="sign">결제하기</st.SignP>
            </st.SignButton>
          </ReservPay>
        </ReservBox>
      </st.Background>
    </>
  );
}

export default Reservation;

const ReservBox = styled.div`
  width: 930px;
  height: 1000px;
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
`;

const ReservInfo = styled.div`
  width: 550px;
  height: 700px;
`;

const ReservPay = styled.div`
  width: 330px;
  height: 750px;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReservP = styled.p`
  font-size: ${(props) => (props.pay ? '1.2' : '1')}rem;
  font-weight: ${(props) => (props.title ? 'bold' : '')};
  color: ${(props) => (props.title ? 'black' : props.pay ? 'black' : 'gray')};
`;

const Input = styled.input`
  width: 550px;
  height: 50px;
  border: 1px solid silver;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  ::placeholder {
    font-size: 1rem;
    color: silver;
  }
`;

const PayBox = styled.div`
  width: 300px;
  height: 120px;
`;

const PayLine = styled.div`
  width: 300px;
  border: 1px solid silver;
`;
