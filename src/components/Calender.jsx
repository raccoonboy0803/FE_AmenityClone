import React from 'react';
import styled from 'styled-components';

const May = () => {
  return (
    <CalDataWrap>
      <thread>
        <tr>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thread>
      <tbody>
        <tr>
          <td>&nbsp;</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
        </tr>
        <tr>
          <td>7</td>
          <td>8</td>
          <td>9</td>
          <td>10</td>
          <td>11</td>
          <td>12</td>
          <td>13</td>
        </tr>
        <tr>
          <td>14</td>
          <td>15</td>
          <td>16</td>
          <td>17</td>
          <td>18</td>
          <td>19</td>
          <td>20</td>
        </tr>
        <tr>
          <td>21</td>
          <td>22</td>
          <td>23</td>
          <td>24</td>
          <td>25</td>
          <td>26</td>
          <td>27</td>
        </tr>
        <tr>
          <td>28</td>
          <td>29</td>
          <td>30</td>
          <td>31</td>
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

  thread {
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
      <May />
    </CalenderWrap>
  );
};

export default Calender;

const CalenderWrap = styled.div`
  margin-top: 20px;
  top: 753px !important;
  margin-left: -479px;
  overflow: hidden;
  width: 375px;
  left: 50% !important;
  border-radius: 4px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
  position: absolute;
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
    top: 15%;
    margin-top: -12px;
    background: url(//image.goodchoice.kr/images/web_v3/ico_arr_lt_4.png) 50%
      50% no-repeat;
    background-size: 12px auto;
    cursor: pointer;
  }
  div:last-child {
    left: auto;
    right: 0;
    margin-right: 10px;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 15%;
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
