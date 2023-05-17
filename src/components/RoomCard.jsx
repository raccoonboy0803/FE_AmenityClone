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

  // useEffect(() => {
  //   setReserveSource({
  //     ...reserveSource,
  //     roomNm,
  //     roomPrice,
  //     startDate: dateSource.startDate,
  //     endDate: dateSource.endDate,
  //     amenityNm,
  //   });
  // }, []);

  const goReservation = () => {
    navigate('/reservation');
    setRoomsource(id);
  };
  // console.log(roomImgDtoList);
  return (
    <RoomWrap>
      <p className="Roompara">
        {/* <img
          src="//image.goodchoice.kr/resize_370x220/affiliate/2019/07/16/5d2d61a54e745.jpg"
          alt="roomImg"
        /> */}
        {roomImgDtoList.map((item, index) => (
          <img src={item.roomUrl} key={index} />
        ))}
      </p>
      <strong>{roomNm}</strong>
      <CardInfo>
        <InfoPrice>
          <strong>가격</strong>
          <div>
            {/* <p className="beforePrice">251,000</p> */}
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
  height: 270px;

  .Roompara {
    display: inline-block;
    position: absolute;
    top: 23px;
    left: 23px;
    width: 376px;
    height: 226px;
    cursor: pointer;
    margin: 0;

    img {
      width: 376px;
      height: 226px;
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
    /* display: inline-block; */
    /* float: right; */
    .beforePrice {
      text-decoration: line-through;
      margin: 0 0 3px 0;
      /* margin-bottom: 3px; */
      /* height: 29px; */
      /* padding-top: 13px; */
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
