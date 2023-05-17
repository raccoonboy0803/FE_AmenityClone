import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  calendarDate,
  calendarModal,
  reserveData,
  roomIdcheck,
} from '../shared/atoms';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ data, amenityNm, id }) => {
  const { roomNm, roomPrice, roomImgDtoList, roomChk } = data;
  const [reserveSource, setReserveSource] = useRecoilState(reserveData);
  const [roomsource, setRoomsource] = useRecoilState(roomIdcheck);
  const dateSource = useRecoilValue(calendarDate);
  const navigate = useNavigate();

  const goReservation = () => {
    navigate('/reservation');
    setRoomsource(id);
  };

  return (
    <RoomWrap>
      <p className="Roompara">
        {roomImgDtoList.map((item, index) => (
          <img src={item.roomUrl} key={index} />
        ))}
      </p>
      <strong>{roomNm}</strong>
      <CardInfo>
        <InfoPrice>
          <strong>가격</strong>
          <div>
            <p className="afterPrice">{roomPrice}원</p>
          </div>
          <UseBtn>객실 이용 안내</UseBtn>
        </InfoPrice>
      </CardInfo>
      {roomChk === '0' ? (
        <ReserveBtn onClick={goReservation}>예약</ReserveBtn>
      ) : (
        <ReserveNotBtn>예약만료</ReserveNotBtn>
      )}
    </RoomWrap>
  );
};

export default RoomCard;

const RoomWrap = styled.div`
  overflow: hidden;
  position: relative;
  margin: 0 0 24px 0;
  background: #fff;
  padding: 24px 24px 24px 424px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  box-sizing: border-box;
  height: 247px;
  width: 100%;

  .Roompara {
    display: inline-block;
    position: absolute;
    top: 23px;
    left: 23px;
    width: 376px;
    /* width: 100%; */
    height: 250px;
    cursor: pointer;
    margin: 0;

    img {
      display: block;
      width: 100%;
      height: 100%;
      /* object-fit: cover; */
      max-width: 100%;
      height: auto;
    }
  }
  strong {
    display: block;
    height: 37px;
    padding: 0;
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
  }
`;
const CardInfo = styled.div`
  overflow: hidden;
  margin: 0;
  min-height: 148px;
`;
const InfoPrice = styled.div`
  position: relative;
  padding: 0;
  border: none;
  border-radius: 0;
  border-bottom: none;

  strong {
    display: block;
    padding-top: 41px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    height: 32px;
    font-size: 16px;
    line-height: 1;
  }

  div {
    position: absolute;
    top: 10px;
    right: 0;
    font-size: 18px;
    text-align: right;
    .beforePrice {
      text-decoration: line-through;
      margin: 0 0 3px 0;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.56);
    }
    .afterPrice {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
  }
`;
const UseBtn = styled.button`
  height: 48px;
  margin: 12px 0;
  font-size: 16px;
  line-height: 48px;
  padding: 0;
  background: #fff url(//image.goodchoice.kr/images/web_v3/ico_arr_gt_2.png)
    100% 50% no-repeat;
  background-size: 12px auto;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  text-align: left;
  width: 100%;
  border: none;
  border-radius: 4px;
`;

const ReserveBtn = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: normal;
  color: #fff;
  text-align: center;
  background: linear-gradient(
    to right,
    rgba(255, 0, 85, 1) 1%,
    rgba(230, 34, 67, 1) 100%
  );
`;
const ReserveNotBtn = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: normal;
  color: #fff;
  text-align: center;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.87) 1%,
    rgba(0, 0, 0, 0.87) 100%
  );
`;
