import tw, { styled } from 'twin.macro';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReserveFilter from '../components/ReserveFilter';
import ReserveCard from '../components/ReserveCard';
import { useQuery } from 'react-query';
import axios from '../api/axios';
import { filterResponse, resetBtnCheck, reserveData } from '../shared/atoms';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

function Reserve() {
  const { amenityType } = useParams();
  const filterData = useRecoilValue(filterResponse);
  const isReset = useRecoilValue(resetBtnCheck);

  const fetchDataH = async () => {
    const response = await axios.get(`/api/amenity/0`);
    return response;
  };

  const fetchDataP = async () => {
    const response = await axios.get(`/api/amenity/1`);
    return response;
  };

  const { data, error, isLoading } = useQuery(
    'fetchData',
    amenityType === '0' ? fetchDataH : fetchDataP,
  );

  return (
    <div
      style={{
        width: '950px',
        display: 'flex',
        margin: '0 auto',
      }}
    >
      <ReserveFilter />
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '0px',
        }}
      >
        <div>
          <ProductWrap>
            <div>
              <h3>숙소 리스트</h3>
            </div>
          </ProductWrap>
        </div>
        <div style={{ width: '100%' }}>
          {isReset
            ? data?.data.data.map((item) => (
                <ReserveCard key={item.amenityId} data={item} />
              ))
            : filterData?.map((item) => (
                <ReserveCard key={item.amenityId} data={item} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Reserve;

const TopSort = styled.div`
  width: 100%;
  display: inline-block;
  position: relative;
  overflow: hidden;
  padding: 0;
  background: #fff;
  box-shadow: none;

  div {
    border: 1px solid rgba(0, 0, 0, 0.08);
    width: 60%;
    height: 40px;
    border-radius: 4px;
    float: right;

    button:first-child {
      border-right: 1px solid rgba(0, 0, 0, 0.08);
    }
    button {
      width: 50%;
      border: none;
      color: rgba(0, 0, 0, 0.87);
      background: rgba(250, 250, 250, 0.6);

      font-size: 16px;
      line-height: 40px;
    }
  }
`;
const ProductWrap = styled.div`
  div {
    position: relative;
    /* padding: 20px 0 0px 0; */
    background: none;

    h3 {
      margin: 0 0 10px 0;
      font-size: 18px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.56);
    }
  }
`;
