import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import single from '../images/icon_single.png';
import singleCheck from '../images/icon_singleCheck.png';
import double from '../images/icon_double.png';
import doubleCheck from '../images/icon_doubleCheck.png';
import twin from '../images/icon_twin.png';
import twinCheck from '../images/icon_twinCheck.png';
import ondol from '../images/icon_ondol.png';
import ondolCheck from '../images/icon_ondolCheck.png';
import Calender from './Calender.jsx';
import { useRecoilValue, useRecoilState } from 'recoil';
import { calendarDate, calendarModal } from '../shared/atoms';
import {
  publicText,
  publicTextP,
  facilityText,
  facilityTextP,
  etcText,
  etcTextP,
} from '../shared/filterData.js';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { filterResponse, resetBtnCheck } from '../shared/atoms';
import { filterInput } from '../shared/atoms';

const ReserveFilter = () => {
  const { amenityType } = useParams();
  const [isModalShow, setIsModalShow] = useRecoilState(calendarModal);
  const [filterRes, setFilterRes] = useRecoilState(filterResponse);
  const [isFilterReset, setIsFilterReset] = useRecoilState(resetBtnCheck);
  const [filterPrev, setFilterPrev] = useRecoilState(filterInput);
  const [people, setPeople] = useState(2); //인원
  const cate = useRef('');

  const [formValue, setFormValue] = useState({
    amenitySdat: '',
    amenityEdat: '',
    amenityType: Number(amenityType), //호텔, 펜션
    amenityCategory: '', //유형
    amenityPeople: '', //인원
    amenityVal: '', //호텔:베드타입 , 펜션:금액
    amenityCommon: [], //공용시설
    amenityIn: [], //객실 내 시설
    amenityEtc: [], // 기타
  });
  const dateValue = useRecoilValue(calendarDate);

  const calenderHandle = () => {
    setIsModalShow((prev) => !prev);
  };

  const peopleHandle = (direction) => {
    if (people === 2 && direction === -1) {
      return;
    }
    setPeople((prev) => prev + direction);
    setFormValue({
      ...formValue,
      amenityPeople: people,
    });
  }; //인원

  const checkboxHandle = (e) => {
    const { name, value } = e.target;
    let prev = formValue[name];

    if (e.target.checked === true) {
      setFormValue({
        ...formValue,
        [name]: [...prev, value],
      });
    } else {
      setFormValue({
        ...formValue,
        [name]: [...prev.filter((item) => item !== value)],
      });
    }
  }; //공통 내부 기타

  const cateHandle = (e) => {
    const { name, value } = e.target;
    const input0 = document.getElementById('grade_0');
    const input1 = document.getElementById('grade_1');
    const input2 = document.getElementById('grade_2');
    let handleArr = [input0, input1, input2];
    for (let i = 0; i < handleArr.length; i++) {
      if (handleArr[i] !== e.target) {
        handleArr[i].checked = false;
      }
    }
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }; //유형

  const amenityValHandle = (e) => {
    const { name, value } = e.target;
    const input0 = document.getElementById('single');
    const input1 = document.getElementById('double');
    const input2 = document.getElementById('twin');
    const input3 = document.getElementById('ondol');
    let handleArr = [input0, input1, input2, input3];
    for (let i = 0; i < handleArr.length; i++) {
      if (handleArr[i] !== e.target) {
        handleArr[i].checked = false;
      }
    }
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }; //베드

  const filterHandle = async () => {
    setFormValue({
      ...formValue,
      amenitySdat: dateValue.start,
      amenityEdat: dateValue.end,
    });
    console.log(formValue);
    try {
      await axios.post('/api/amenity/filterAmenity', formValue).then((res) => {
        console.log(res);
        setFilterRes(res.data.data);
      });

      setFilterPrev(formValue);
      setIsFilterReset(false);
    } catch (error) {
      console.log(error);
    }
  };
  const filterReset = () => {
    setFilterRes([]);
    setFilterPrev({});
    setIsFilterReset(true);
    setFormValue({
      amenitySdat: `${new Date().getFullYear()}-0${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      amenityEdat: `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${
        new Date().getDate() + 1
      }`,
      amenityCategory: '', //유형
      amenityPeople: '', //인원
      amenityVal: '', //호텔:베드타입 , 펜션:금액
      amenityCommon: [], //공용시설
      amenityIn: [], //객실 내 시설
      amenityEtc: [], // 기타
    });
    window.location.reload();
  };
  // console.log(formValue);
  return (
    <FilterWrap>
      <DateWrap>
        <h3>날짜</h3>
        <div onClick={calenderHandle}>
          <span>
            <b>
              5.{dateValue.startDate}~ 5.{dateValue.endDate}
            </b>
            <em>&nbsp;&nbsp;{dateValue.endDate - dateValue.startDate}박</em>
          </span>
        </div>
      </DateWrap>
      <CalenderWrap>{isModalShow && <Calender />}</CalenderWrap>

      <DetailTitle>상세조건</DetailTitle>
      <BtnWrap>
        <button onClick={filterReset}>초기화</button>
        <button onClick={filterHandle}>적용</button>
      </BtnWrap>
      <ListWrap>
        <strong>호텔 리조트 유형</strong>
        <ul ref={cate}>
          <li>
            <input
              type="checkbox"
              id="grade_0"
              value="0"
              name="amenityCategory"
              onClick={cateHandle}
            />
            <label htmlFor="grade_0">5성급</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="grade_1"
              value="1"
              name="amenityCategory"
              onClick={cateHandle}
            />
            <label htmlFor="grade_1">특1급</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="grade_2"
              value="2"
              name="amenityCategory"
              onClick={cateHandle}
            />
            <label htmlFor="grade_2">특급</label>
          </li>
        </ul>
      </ListWrap>
      <PeopleWrap>
        <input type="hidden" />
        <strong>인원</strong>
        <div>
          <button onClick={() => peopleHandle(-1)} />
          <span>{people}</span>
          <button onClick={() => peopleHandle(+1)} />
        </div>
      </PeopleWrap>
      {amenityType === '0' ? (
        <BedWrap>
          <strong>베드 타입</strong>
          <div className="bedtype">
            <div>
              <div>
                <BedBtn
                  id="single"
                  type="checkbox"
                  name="amenityVal"
                  value="0"
                  onChange={amenityValHandle}
                />
                <p>싱글</p>
              </div>
            </div>
            <div>
              <div>
                <BedBtn
                  id="double"
                  type="checkbox"
                  name="amenityVal"
                  value="1"
                  onChange={amenityValHandle}
                />
                <p>더블</p>
              </div>
            </div>
            <div>
              <div>
                <BedBtn
                  id="twin"
                  type="checkbox"
                  name="amenityVal"
                  value="2"
                  onChange={amenityValHandle}
                />
                <p>트윈</p>
              </div>
            </div>
            <div>
              <div>
                <BedBtn
                  id="ondol"
                  type="checkbox"
                  name="amenityVal"
                  value="3"
                  onChange={amenityValHandle}
                />
                <p>온돌</p>
              </div>
            </div>
          </div>
        </BedWrap>
      ) : (
        <BedWrap>
          <div className="bedtype"></div>
        </BedWrap>
      )}
      <PublicSection>
        <strong>공용시설</strong>
        <ul>
          {(amenityType === '0' ? publicText : publicTextP).map((item) => (
            <SelectList key={item.id}>
              <input
                type="checkbox"
                id={`${item.value}lebel`}
                value={item.id}
                name="amenityCommon"
                onClick={checkboxHandle}
              />
              <label htmlFor={`${item.value}lebel`}>{item.value}</label>
            </SelectList>
          ))}
        </ul>
      </PublicSection>
      <PublicSection>
        <strong>객실 내 시설</strong>
        <ul>
          {(amenityType === '0' ? facilityText : facilityTextP).map((item) => (
            <SelectList key={item.id}>
              <input
                type="checkbox"
                id={`${item.value}lebel`}
                name="amenityIn"
                value={item.id}
                onClick={checkboxHandle}
              />
              <label htmlFor={`${item.value}lebel`}>{item.value}</label>
            </SelectList>
          ))}
        </ul>
      </PublicSection>
      <PublicSection>
        <strong>기타</strong>
        <ul>
          {(amenityType === '0' ? etcText : etcTextP).map((item) => (
            <SelectList key={item.id}>
              <input
                type="checkbox"
                id={`${item.value}lebel`}
                name="amenityEtc"
                value={item.id}
                onClick={checkboxHandle}
              />
              <label htmlFor={`${item.value}lebel`}>{item.value}</label>
            </SelectList>
          ))}
        </ul>
      </PublicSection>
    </FilterWrap>
  );
};

export default ReserveFilter;

const FilterWrap = styled.div`
  display: inline-block;
  position: relative;
  /* top: 40px; */
  z-index: 1;
  width: 296px;
  margin: 0 32px 0 31px;
  padding-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  background: #fff;
`;
const DateWrap = styled.section`
  display: block;
  margin: 0 0 0 24px;
  padding: 27px 0 0 0;
  border-bottom: none;
  position: relative;

  h3 {
    display: block;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.87);
    font-weight: bold;
  }

  div {
    display: inline-block;
    position: relative;
    width: 246px;
    height: 40px;
    margin: 13px 0 32px 0;
    padding: 0 0 0 39px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    background: rgba(250, 250, 250, 0.7)
      url(//image.goodchoice.kr/images/web_v3/ico_arr_down.png) right 8px bottom
      50% no-repeat;
    background-size: 24px auto;
    font-size: 18px;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.56);
    text-align: left;
    box-sizing: border-box;

    span {
      cursor: pointer;
      font-size: 18px;
      line-height: 40px;
      color: rgba(0, 0, 0, 0.56);
      text-align: left;

      b {
        font-weight: normal;
      }
      em {
        font-style: normal;
        font-weight: normal;
      }
    }
  }
  div:after {
    display: inline-block;
    content: '';
    position: absolute;
    top: 4px;
    left: 3px;
    width: 32px;
    height: 32px;
    background: url(//image.goodchoice.kr/images/web_v3/ico_cal_2.png) 0 0
      no-repeat;
    background-size: 32px auto;
  }
`;
const DetailTitle = styled.h3`
  margin: 0 24px;
  padding-top: 31px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: block;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
`;
const BtnWrap = styled.div`
  overflow: hidden;
  position: relative;
  top: auto;
  height: 64px;
  padding: 0 24px;
  border-bottom: none;

  button:first-child {
    float: left;
    width: 120px;
    border: 1px solid rgb(242, 7, 76);
    background: #fff;
    color: rgb(242, 7, 76);
    height: 40px;
    margin-top: 13px;
    border-radius: 4px;
    font-size: 16px;
  }
  button:last-child {
    float: right;
    width: 120px;
    border: 1px solid rgb(242, 7, 76);
    background: rgb(242, 7, 76);
    color: #fff;
    height: 40px;
    margin-top: 13px;
    border-radius: 4px;
    font-size: 16px;
  }
`;
const ListWrap = styled.section`
  margin: 0 0 0 24px;
  padding: 27px 0 0 0;
  border-bottom: none;
  position: relative;
  font-family: 'Pretendard', 'Apple SD Gothic Neo', '맑은 고딕', '맑은고딕',
    'Malgun Gothic', sans-serif;
  font-size: 14px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.87);
  -webkit-text-size-adjust: none;

  strong {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.56);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 21px 0 0 0;
    li {
      margin-bottom: 16px;
      input[type='checkbox'] {
        height: 18px;
        width: 18px;
        margin: 0 7px 0 0;
        accent-color: rgb(242, 7, 76);
      }
      label {
        height: 21px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: 0 0;
        font-size: 16px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.56);
        vertical-align: top;
        cursor: pointer;
      }
    }
  }
`;
const PeopleWrap = styled.section`
  margin: 0 0 0 24px;
  padding: 27px 0 0 0;
  border-bottom: none;
  display: flex;

  strong {
    position: relative;
    margin-bottom: 21px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.56);
  }
  div {
    display: flex;
    margin-left: 100px;

    button:first-child {
      width: 24px;
      height: 24px;
      background: url(//image.goodchoice.kr/images/web_v3/ico_minus.png) 50% 50%
        no-repeat;
      background-size: 20px auto;
      border: none;
    }
    span {
      display: block;
      text-align: center;
      font-size: 18px;
      margin: 0 30px 0 30px;
      font-weight: bold;
      color: rgb(229, 16, 72);
    }
    button:last-child {
      width: 24px;
      height: 24px;
      background: url(//image.goodchoice.kr/images/web_v3/ico_plus.png) 50% 50%
        no-repeat;
      background-size: 20px auto;
      border: none;
    }
  }
`;
const BedWrap = styled.section`
  margin: 0 0 0 24px;
  padding: 27px 0 0 0;
  border-bottom: none;

  strong {
    display: block;
    position: relative;
    margin-bottom: 21px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.56);
  }
  .bedtype {
    /* overflow: hidden; */
    width: 304px;
    /* margin-left: -20px; */
    display: flex;
    flex-direction: row;

    div {
      display: inline-block;

      div {
        margin-right: 8px;
        cursor: pointer;
        text-align: center;
        p {
          width: 48px;
          margin: 0;
          color: rgba(0, 0, 0, 0.87);
          font-size: 13px;
        }
      }
    }
  }
`;
const PublicSection = styled.section`
  height: 230px;
  margin: 15px 0 0 24px;
  padding: 27px 0 0 0;
  border-bottom: none;
  strong {
    display: block;
    position: relative;
    margin-bottom: 21px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.56);
  }
  ul {
    padding: 0;
  }
`;

const BedBtn = styled('input')`
  margin: 0 10px 0 0;
  width: 48px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  appearance: none;

  ${(props) =>
    props.id === 'single'
      ? `background-image: url(${single});`
      : props.id === 'double'
      ? `background-image: url(${double});`
      : props.id === 'twin'
      ? `background-image: url(${twin});`
      : `background-image: url(${ondol});`}

  &:checked {
    ${(props) =>
      props.id === 'single'
        ? `background-image: url(${singleCheck});`
        : props.id === 'double'
        ? `background-image: url(${doubleCheck});`
        : props.id === 'twin'
        ? `background-image: url(${twinCheck});`
        : `background-image: url(${ondolCheck});`}
  }
`;

const SelectList = styled.li`
  float: left;
  width: 50%;
  list-style: none;
  margin-bottom: 16px;
  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    margin: 0 5px 0 0;
    padding: 0;
    border: 0;
    accent-color: rgb(242, 7, 76);
  }
  label {
    padding: 0 0 0 3px;
    height: 21px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: 0 0;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.56);
    vertical-align: top;
    cursor: pointer;
  }
`;
const CalenderWrap = styled.div`
  position: absolute;
  top: 145px;
  left: 23px;
  z-index: 200;
`;
