import React from 'react';
import styled from 'styled-components';
import { getMonthDate, getNewDateObj } from './Calendar2';

export const CalendarDate = () => {
  const newDate = getNewDateObj(new Date());
  const response = getMonthDate(newDate);

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
              <td key={date.date}>{date.date}</td>
            ),
          )}
        </tr>
        <tr>
          {response.date[1].map((date) => (
            <td key={date.date}>{date.date}</td>
          ))}
        </tr>
        <tr>
          {response.date[2].map((date) => (
            <td key={date.date}>{date.date}</td>
          ))}
        </tr>
        <tr>
          {response.date[3].map((date) => (
            <td key={date.date}>{date.date}</td>
          ))}
        </tr>
        <tr>
          {response?.date[4].map((date) =>
            date.date.toString().length === 1 ? (
              <td key={date.date} style={{ color: 'white' }}>
                {date.date}
              </td>
            ) : (
              <td key={date.date}>{date.date}</td>
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

const Calender = () => {
  return (
    <CalenderWrap>
      <CalenderTop>
        <CalenderTitle>
          <div />
          <div>
            <span>2023년&nbsp;</span>
            <span>5월</span>
          </div>
          <div />
        </CalenderTitle>
      </CalenderTop>
      <CalendarDate />
    </CalenderWrap>
  );
};

export default Calender;

const CalenderWrap = styled.div`
  /* margin-top: 20px; */
  /* top: 703px !important; */
  /* margin-left: -479px; */
  overflow: hidden;
  width: 375px;
  /* left: 50% !important; */
  border-radius: 4px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
  /* position: absolute; */
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
    right: -25%;
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
    /* span{

    } */
  }
`;
