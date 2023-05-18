import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import caroBtn from '../images/icon_prev_btn.png';
import Calender from '../components/Calender';
import RoomCard from '../components/RoomCard';
import { useQuery } from 'react-query';
import axios from '../api/axios';
import Cookies from 'js-cookie';
import {
  calendarDate,
  calendarModal,
  reserveData,
  reserverT,
  amenityIdSave,
} from '../shared/atoms';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
const ReserveDetail = () => {
  const { amenityId } = useParams();
  console.log(amenityId);
  const token = Cookies.get('accessToken');
  const refreshtoken = Cookies.get('refreshToken');
  const [reserveSource, setReserveSource] = useRecoilState(reserveData);
  const [isModalShow, setIsModalShow] = useRecoilState(calendarModal);
  const [reserveR, setReserveR] = useRecoilState(reserverT);
  const calendarsource = useRecoilValue(calendarDate);
  const [amenitySave, setAmenitySave] = useRecoilState(amenityIdSave);

  const detailData = async () => {
    const response = await axios.get(`/api/amenity/detail/${amenityId}`);
    return response;
  };

  const { isLoading, data, error } = useQuery('datailgo', detailData);

  useEffect(() => {
    setReserveR(data);
    setAmenitySave(amenityId);
  });
  // console.log(isLoading);
  // console.log(data?.data.data);
  // console.log(data?.data.amenityImgDtoList);
  // console.log(error);
  // console.log(data);

  const {
    amenityCategory,
    amenityAddr,
    amenityNm,
    roomDtoList,
    amenityImgDtoList,
  } = !isLoading && data?.data.data;

  const calenderHandle = () => {
    setIsModalShow((prev) => !prev);
  };

  const [index, setIndex] = useState(0);
  const [btnActive, setBtnActive] = useState('reserve');

  const listSize = 4;
  const prevBtn = () => {
    if (index < 0) {
      setIndex(listSize - 1);
      return;
    }
    setIndex((prev) => prev - 1);
  };
  const nextBtn = () => {
    if (index === listSize) {
      setIndex(0);
      return;
    }
    setIndex((prev) => prev + 1);
  };

  const styles = {
    transform: `translate3d(-${490 * index}px, 0, 0)`,
  };
  const bottomStyle = {
    transform: `translate3d(-${120 * index}px, 0, 0)`,
  };
  const btnClick = (e) => {
    const { id } = e.target;
    setBtnActive(id);
  };
  useEffect(() => {
    const allBtnArr = ['reserve', 'info', 'review'];
    const nonTargetedBtnArr = allBtnArr.filter((item) => item != btnActive);
    document.getElementById(btnActive).style.color = 'red';
    document.getElementById(btnActive).style.borderBottom =
      '3px solid rgb(242, 17, 76)';
    document.getElementById(btnActive).style.fontWeight = 'bold';
    nonTargetedBtnArr.map((item) => {
      document.getElementById(item).style.color = 'rgba(0, 0, 0, 0.38)';
      document.getElementById(item).style.borderBottom = 'none';
      document.getElementById(item).style.fontWeight = '400';
      return null;
    });
  }, [btnActive]);

  const handleRoomCard = (e) => {
    const { roomNm, roomPrice } = e.target;

    setReserveSource({
      ...reserveSource,
      roomNm,
      roomPrice,
      startDate: dateSource.startDate,
      endDate: dateSource.endDate,
      amenityNm,
    });
  };

  return (
    <DetailWrap>
      <DetailTop>
        <DetailTopLeft>
          <div>
            <SwiperTop>
              <ul style={styles}>
                {amenityImgDtoList?.map((item, index) => (
                  <SwiperTopList key={index}>
                    <img src={item.imageUrl} />
                  </SwiperTopList>
                ))}
              </ul>
            </SwiperTop>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Prev onClick={prevBtn} />
              <SwiperBottom>
                <ul style={bottomStyle}>
                  {amenityImgDtoList?.map((item, index) => (
                    <li key={index}>
                      <img src={item.imageUrl} />
                    </li>
                  ))}
                </ul>
              </SwiperBottom>
              <Next onClick={nextBtn} />
            </div>
          </div>
        </DetailTopLeft>
        <Right>
          <Info>
            <span>{amenityCategory}</span>
            <h2>{amenityNm}</h2>
            <div>
              <span>9.1</span>
              추천해요
            </div>
            <p>{amenityAddr}</p>
          </Info>
        </Right>
      </DetailTop>
      <DetailTab>
        <button id="reserve" onClick={btnClick}>
          객실안내/예약
        </button>
        <button id="info" onClick={btnClick}>
          숙소정보
        </button>
        <button id="review" onClick={btnClick}>
          리뷰
        </button>
      </DetailTab>
      <DetailForm>
        <RoomInfo>
          <BtnData onClick={calenderHandle}>
            <span>
              {calendarsource.month}.{calendarsource.startDate} ~
              {calendarsource.month}.{calendarsource.endDate}
            </span>
            <span>
              &nbsp;·&nbsp;{calendarsource.endDate - calendarsource.startDate}박
            </span>
            <CalenderWrap>{isModalShow && <Calender />}</CalenderWrap>
          </BtnData>
        </RoomInfo>
        {roomDtoList?.map((item, index) => (
          <RoomCard
            id={item.roomId}
            data={item}
            key={item.roomNm}
            roomNm={item.roomNm}
            roomPrice={item.roomPrice}
            amenityNm={amenityNm}
            onClick={() => handleRoomCard}
          />
        ))}
      </DetailForm>
    </DetailWrap>
  );
};

export default ReserveDetail;

const DetailWrap = styled.div`
  width: 1024px;
  height: 100vh;
  margin: 112px auto 0 auto;
`;
const DetailTop = styled.div`
  padding: 0 31px;
  height: 500px;
`;
const DetailTopLeft = styled.div`
  float: left;
  width: 490px;
`;

const SwiperTop = styled.div`
  width: 490px;
  height: 348px;
  margin-bottom: 13px;
  overflow-x: hidden;

  ul {
    transform: translate3d(0, 0, 0);
    transition: transform 0.2s;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    margin: 0;
    padding: 0;
    border: 0;
  }
`;
const SwiperTopList = styled.li`
  width: 490px;
  opacity: 1;
  transition-duration: 0ms;
  pointer-events: none;
  transition-property: opacity;
  list-style: none;
`;
const SwiperBottom = styled.div`
  display: inline-block;
  width: 460px;
  height: 86px;
  background: #fff;
  overflow-x: hidden;
  ul {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 20;
    display: flex;
    padding: 0;
    margin: 0;

    li {
      width: 115px;
      display: inline-block;
      height: 86px;
      padding: 2px;
      border: 1px solid #fff;
      border-radius: 4px;
      cursor: pointer;
      list-style: none;

      img {
        width: 100%;
      }
    }
  }
`;
const Prev = styled.div`
  background: url(${caroBtn}) 6px 50% no-repeat;
  background-size: 8px auto;
  transform: rotate(180deg);
  width: 15px;
  height: 86px;
  display: inline-block;
  cursor: pointer;
`;
const Next = styled.div`
  background: url(${caroBtn}) 6px 50% no-repeat;
  background-size: 8px auto;
  width: 15px;
  height: 86px;
  display: inline-block;
  cursor: pointer;
`;

const Right = styled.div`
  float: right;
  width: 424px;
`;
const Info = styled.div`
  span {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(103, 101, 201, 1);
    vertical-align: top;
    font-size: 20px;
    line-height: 27px;
    padding: 1px;
    margin-right: 5px;
  }
  h2 {
    display: inline;
    margin: 9px 0 0 0;
    font-size: 28px;
    color: rgba(0, 0, 0, 0.87);
    font-weight: bold;
  }
  div {
    position: relative;
    clear: both;
    margin: 9px 0 6px 0;
    font-size: 18px;
    color: rgb(255, 167, 38);
    span {
      display: inline-block;
      position: relative;
      /* top: -3px; */
      height: 18px;
      margin-right: 7px;
      padding: 0 4px;
      border-radius: 4px;
      background: rgb(255, 167, 38);
      font-size: 14px;
      line-height: 20px;
      color: #fff;
    }
  }
  p {
    margin: 6px 0 8px 0;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.56);
    padding-top: 6px;
  }
`;
const DetailTab = styled.div`
  padding: 0 31px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  button {
    float: none;
    height: 72px;
    margin-right: 24px;
    padding: 0;
    border: none;
    border-bottom: 2px solid #fff;
    background: none;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.38);
  }
`;
const DetailForm = styled.div``;

const RoomInfo = styled.article`
  width: 962px;
  margin: 0 auto;
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
  top: 50px;
  left: 0;
  z-index: 200;
  height: 230px;
`;
