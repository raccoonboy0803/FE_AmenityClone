import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import * as st from '../shared/styles';
import SelectPayment from './reservation/SelectPayment';
import CheckedAgree from './reservation/CheckedAgree';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { reserveData, reserverT, roomIdcheck } from '../shared/atoms';
import Calender from '../components/Calender';
import axios from '../api/axios';
import Cookies from 'js-cookie';

function Reservation() {
  let navigate = useNavigate();

  const accessToken = Cookies.get('accessToken');
  const refreshtoken = Cookies.get('refreshToken');
  const user = localStorage.getItem('userEmail');

  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [reserveD, setReserveD] = useRecoilState(reserverT); //해당 숙소 데이터
  const [roomid, setRoomid] = useRecoilState(roomIdcheck); //룸 id

  console.log('데이터', reserveD);
  console.log('룸ID', roomid);

  const room = reserveD.data.data.roomDtoList;

  const [roomFilter] = room.filter((item) => item.roomId == roomid);
  console.log('룸::', room);
  console.log('룸필터::', roomFilter);
  console.log('같은 값', roomFilter.roomId);

  useEffect(() => {
    if (localStorage.getItem('userEmail') === null) {
      alert('로그인 후에 이용 가능합니다.');
      navigate('/login');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
          ACCESS_KEY: `Bearer ${accessToken}`,
          REFRESH_KEY: `Bearer ${refreshtoken}`,
        },
      }
      const response = await axios.post(
        '/api/reserve/register',
        JSON.stringify({
          username,
          payMethod: '카카오페이',
          userEmail,
          amenityId: 0,
          roomId: roomid,
          price: Number((roomFilter?.roomPrice).replace(',','')),
          reserveStartDate: 'string',
          reserveEndDate: 'string',
        }), config
      );
      console.log(JSON.stringify(response?.data));
      alert('예약이 완료 되었습니다.');
      navigate('/mypage');
    } catch (err) {
      if (!err?.response) {
        alert('서버의 응답이 없습니다');
      } else {
        alert('예약에 실패했습니다');
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   alert('예약이 완료 되었습니다.')
  // }

  return (
    <>
      <Header />
      <st.Background>
        <form onSubmit={handleSubmit}>
          <ReservBox>
            <ReservInfo>
              <ReservP title="title">예약자 정보</ReservP>
              <div style={{ marginTop: '40px' }}></div>
              <ReservP>예약자 이름</ReservP>
              <Input
                placeholder="체크인시 필요한 정보입니다."
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <ReservP>이메일 주소</ReservP>
              <Input
                placeholder="체크인시 필요한 정보입니다."
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <div style={{ height: '50px' }}></div>
              <ReservP title="title">결제수단 선택</ReservP>
              <SelectPayment />
              <CheckedAgree />
            </ReservInfo>

            <ReservPay>
              <PayBox>
                <ReservP>숙소이름</ReservP>
                <ReservP pay="pay">{reserveD?.data?.data?.amenityNm}</ReservP>
              </PayBox>
              <PayBox>
                <ReservP>객실타입</ReservP>
                <ReservP pay="pay">{roomFilter?.roomNm}</ReservP>
              </PayBox>

            <PayBox>
              <ReservP>체크인</ReservP>
              <ReservP pay="pay">05.15 월 15:00</ReservP>
            </PayBox>

            <PayBox>
              <ReservP>체크아웃</ReservP>
              <ReservP pay="pay">05.16 화 12:00</ReservP>
            </PayBox> */}
              <Calender />

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
                  {roomFilter?.roomPrice}원
                </span>
                <div style={{ height: '20px' }}></div>
              </PayBox>
              <li style={{ color: 'gray' }}>
                해당 객실가는 세금, 봉사료가 포함된 금액입니다
              </li>
              <li style={{ color: 'gray' }}>
                결제완료 후{' '}
                <span style={{ color: '#de383f' }}>예약자 이름</span>
                으로 바로 <span style={{ color: '#de383f' }}>체크인</span>{' '}
                하시면 됩니다
              </li>
              <st.SignButton type="sign">
                <st.SignP type="sign" onClick={handleSubmit}>
                  결제하기
                </st.SignP>
              </st.SignButton>
            </ReservPay>
          </ReservBox>
        </form>
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
