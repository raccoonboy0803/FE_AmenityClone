import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import * as st from '../shared/styles';
import SelectPayment from './reservation/SelectPayment';
import CheckedAgree from './reservation/CheckedAgree';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  reserveData,
  reserverT,
  roomIdcheck,
  amenityIdSave,
  calendarDate,
} from '../shared/atoms';
import Calender from '../components/Calender';
import axios from '../api/axios';
import Cookies from 'js-cookie';
import { useAmenityContext } from '../shared/AmenityContext';

function Reservation(props) {
  const amenityId = useAmenityContext();
  console.log('amenityId:', amenityId);

  const [check, setCheck] = useState([]);

  let navigate = useNavigate();
  const [amenitySave, setAmenitySave] = useRecoilState(amenityIdSave);
  const [calenderData, setCalendarData] = useRecoilState(calendarDate);

  console.log(amenitySave); //숙소 ID

  console.log(calenderData.month); //월
  console.log(calenderData.startDate); //체크인 일
  console.log(calenderData.endDate); //체크아웃 일
  console.log(calenderData.start); //2023-01-01 형태 체크인
  console.log(calenderData.end); //2023-01-01 형태 체크아웃

  const accessToken = Cookies.get('accessToken');
  const refreshtoken = Cookies.get('refreshToken');
  const user = localStorage.getItem('userEmail');

  console.log(amenitySave); //ID

  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [reserveD, setReserveD] = useRecoilState(reserverT); //해당 숙소 데이터
  const [roomid, setRoomid] = useRecoilState(roomIdcheck); //룸 id
  const calendarsource = useRecoilValue(calendarDate);

  console.log('데이터', reserveD);
  console.log('룸ID', roomid);

  const room = reserveD.data.data.roomDtoList;

  const [roomFilter] = room.filter((item) => item.roomId == roomid);
  console.log('룸::', room);
  console.log('룸필터::', roomFilter);
  console.log('같은 값', roomFilter.roomId);

  const roomPrice = Number(roomFilter?.roomPrice.replace(',', ''));
  const roomPriceNumber =
    (calendarsource.endDate - calendarsource.startDate) * roomPrice;

  useEffect(() => {
    if (localStorage.getItem('userEmail') === null) {
      alert('로그인 후에 이용 가능합니다.');
      navigate('/login');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert('예약자 이름을 확인해주세요.');
    } else if (userEmail !== user) {
      alert('이메일을 확인해주세요.');
    } else if (check.length !== 4) {
      alert('필수 동의를 확인해주세요.');
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true,
            ACCESS_KEY: `Bearer ${accessToken}`,
            REFRESH_KEY: `Bearer ${refreshtoken}`,
          },
        };
        const response = await axios.post(
          '/api/reserve/register',
          JSON.stringify({
            username,
            payMethod: '카카오페이',
            userEmail,
            amenityId: amenitySave,
            roomId: roomid,
            price: roomPriceNumber,
            reserveStartDate: calenderData.start,
            reserveEndDate: calenderData.end,
          }),
          config,
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
    }
  };

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
              <CheckedAgree check={check} setCheck={setCheck} />
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
              <ReservP pay="pay">{calenderData.start}</ReservP>
            </PayBox>

            <PayBox>
              <ReservP>체크아웃</ReservP>
              <ReservP pay="pay">{calenderData.end}</ReservP>
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
                  {roomPriceNumber
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  원
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
  height: 780px;
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

const BtnData = styled.div`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 40px;
  margin: 32px 0;
  padding: 0 0 0 38px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  background: rgba(250, 250, 250, 0.7)
    url(//image.goodchoice.kr/images/web_v3/ico_cal_2.png) 3px 50% no-repeat;
  background-size: 32px auto;
  font-size: 18px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.87);
  span {
    font-size: 18px;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.87);
  }

  :after {
    display: inline-block;
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    background: url(//image.goodchoice.kr/images/web_v3/ico_arr_down.png) 0 0
      no-repeat;
    background-size: 24px auto;
  }
`;
const CalenderWrap = styled.div`
  position: absolute;
  top: 92%;
  right: 25%;
  z-index: 200;
`;
