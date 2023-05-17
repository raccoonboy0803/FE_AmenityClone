import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getMonthDate, getNewDateObj } from './Calendar2';
import { useRecoilState } from 'recoil';
import { calendarDate, calendarModal } from '../shared/atoms';

export const CalendarDate = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) => {
  const newDate = getNewDateObj(new Date());

  const response = getMonthDate(newDate);

  const current = new Date().getDate();
  const onDateClick = (e) => {
    const { innerText } = e.target;
    if (innerText < current) {
      return;
    }
    if (innerText >= endDate) {
      setStartDate(innerText);
      setEndDate(undefined);
    } else if (endDate === undefined) {
      setEndDate(innerText);
    } else if (innerText <= startDate && endDate !== undefined) {
      setStartDate(innerText);
      setEndDate(undefined);
    } else if (innerText >= startDate && innerText <= endDate) {
      setStartDate(innerText);
      setEndDate(undefined);
    }
  };
  console.log('start::::::', startDate);
  console.log('end:::::::', endDate);
  useEffect(() => {
    const res = document.getElementsByTagName('td');

    for (let i = 0; i < new Date().getDate(); i++) {
      res[i].style.color = 'rgba(0, 0, 0, 0.38)';
      res[i].style.background = 'white';
    }
    for (let i = startDate; i <= endDate; i++) {
      res[i].style.background = 'rgb(242, 17, 76)';
    }
    for (let i = 0; i < res.length; i++) {
      if (i >= startDate && i <= endDate) {
        continue;
      }
      res[i].style.background = 'white';
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const res = document.getElementsByTagName('td');
    res[startDate].style.background = 'rgb(242, 17, 76)';
  }, [startDate]);

  return (
    <CalDataWrap>
      <thead>
        <tr>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {response.date[0].map((date) =>
            date.date > 7 ? (
              <td key={date.date} style={{ color: 'white' }}>
                {date.date}
              </td>
            ) : (
              <td key={date.date} onClick={onDateClick}>
                {date.date}
              </td>
            ),
          )}
        </tr>
        <tr>
          {response.date[1].map((date) => (
            <td key={date.date} onClick={onDateClick}>
              {date.date}
            </td>
          ))}
        </tr>
        <tr>
          {response.date[2].map((date) => (
            <td key={date.date} onClick={onDateClick}>
              {date.date}
            </td>
          ))}
        </tr>
        <tr>
          {response.date[3].map((date) => (
            <td key={date.date} onClick={onDateClick}>
              {date.date}
            </td>
          ))}
        </tr>
        <tr>
          {response?.date[4].map((date) =>
            date.date.toString().length === 1 ? (
              <td key={date.date} style={{ color: 'white' }}>
                {date.date}
              </td>
            ) : (
              <td key={date.date} onClick={onDateClick}>
                {date.date}
              </td>
            ),
          )}
        </tr>
      </tbody>
    </CalDataWrap>
  );
};
const CalDataWrap = styled.table`
  touch-action: none;
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-family: 'Pretendard', 'Apple SD Gothic Neo', '맑은 고딕', '맑은고딕',
    'Malgun Gothic', sans-serif;
  border-spacing: 0;

  thead {
    display: table-header-group;
    vertical-align: middle;
    th {
      background: #f8f8f8;
      font-size: 14px;
      border-bottom: 1px solid #e2e2e2;
      color: rgba(0, 0, 0, 0.56);
      font-weight: bold;
      padding-bottom: 8px;
    }
  }

  tbody {
    display: table-row-group;
    text-align: center;

    td {
      padding-top: 15px !important;
    }
  }
`;

const Calender = ({ props }) => {
  const [recoilState, setRecoilDate] = useRecoilState(calendarDate);
  const [modalShow, setModalShow] = useRecoilState(calendarModal);
  const newDate = getNewDateObj(new Date());
  const response = getMonthDate(newDate);

  if (recoilState.startDate === 0) {
  }
  const [startDate, setStartDate] = useState(
    recoilState.startDate === new Date().getDate()
      ? new Date().getDate()
      : recoilState.startDate,
  );
  const [endDate, setEndDate] = useState(
    recoilState.endDate === new Date().getDate() + 1
      ? new Date().getDate() + 1
      : recoilState.endDate,
  );
  console.log(startDate);
  console.log(endDate);

  const dateSelect = () => {
    setRecoilDate({
      year: response.year,
      month: response.month,
      startDate,
      endDate,
      start: `${response.year}-0${response.month}-${startDate}`,
      end: `${response.year}-0${response.month}-${endDate}`,
    });
    setModalShow(false);
  };

  return (
    <CalenderWrap>
      <CalenderTop>
        <CalenderTitle>
          <div />
          <div>
            <span>{response.year}년&nbsp;</span>
            <span>{response.month}월</span>
          </div>
          <div />
        </CalenderTitle>
      </CalenderTop>
      <CalendarDate
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
      />
      <CalBtnWrap>
        <button onClick={dateSelect}>선택 완료</button>
      </CalBtnWrap>
      {/* <button onClick={dateSelect}>선택 완료</button> */}
    </CalenderWrap>
  );
};

export default Calender;

const CalenderWrap = styled.div`
  overflow: hidden;
  width: 375px;
  border-radius: 4px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
  z-index: 200;
`;
const CalenderTop = styled.div``;
const CalenderTitle = styled.div`
  background: #f8f8f8;
  font-weight: bold;

  div:first-child {
    left: 0;
    margin-left: 10px;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 11%;
    margin-top: -12px;
    background: url(//image.goodchoice.kr/images/web_v3/ico_arr_lt_4.png) 50%
      50% no-repeat;
    background-size: 12px auto;
    cursor: pointer;
  }
  div:last-child {
    right: 1%;
    margin-right: 10px;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 11%;
    left: auto;
    margin-top: -12px;
    background: url(//image.goodchoice.kr/images/web_v3/ico_arr_gt_4.png) 50%
      50% no-repeat;
    background-size: 12px auto;
    cursor: pointer;
  }
  div {
    height: 63px;
    line-height: 63px;
    font-size: 16px;
    text-align: center;
  }
`;
const CalBtnWrap = styled.div`
  position: relative;
  bottom: auto;
  left: auto;
  width: 100%;
  height: auto;
  margin-top: 0;
  padding: 16px 16px 16px 16px;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background: #fff;

  button {
    width: 91%;
    height: 52px;
    border: 1px solid rgb(242, 17, 76);
    background: #fff;
    font-size: 16px;
    font-weight: bold;
    color: rgb(242, 17, 76);

    border-radius: 4px;
  }
`;
