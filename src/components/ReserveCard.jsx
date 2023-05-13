import React from 'react';
import styled from 'styled-components';

const ReserveCard = () => {
  return (
    <ListWrap>
      <ProductList>
        <a href="#">
          <p>
            <img src="//image.goodchoice.kr/resize_1000X500x0/affiliate/2023/01/30/63d7641ad61a2.jpg" />
          </p>
          <div>
            <div>
              <p>4성급</p>
              <strong>보코서울강남, IHG 호텔</strong>
              <p className="secondP">10.0 최고에요 (13)</p>
              <p className="lastP">강남구</p>
            </div>
          </div>
        </a>
      </ProductList>
    </ListWrap>
  );
};

export default ReserveCard;

const ListWrap = styled.div`
  display: inline-block;
  /* float: right; */
  /* min-width: 6px; */
  width: 100%;
  /* margin-top: 40px; */
`;

const ProductList = styled.li`
  overflow: hidden;
  position: relative;
  height: 280px;
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    display: block;
    height: 280px;
    color: #fff;
    text-decoration: none;

    img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      min-height: 280px;
    }
    div {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      padding: 0 24px;
      background: rgba(0, 0, 0, 0.2);

      div {
        position: absolute;
        top: 140px;
        bottom: 0px;
        left: 0px;
        background: none;

        p:first-child {
          display: inline-block;
          background-color: rgba(97, 95, 184, 1);
          height: 18px;
          padding: 0 3px;
          font-size: 14px;
          line-height: 18px;
          margin: 0;
        }
        strong {
          display: block;
          height: auto;
          font-size: 26px;
          line-height: normal;
          margin-top: 8px;
        }
        .secondP {
          height: auto;
          margin-top: 7px;
          margin-bottom: 0;
          line-height: normal;
          color: rgb(255, 167, 38);
          font-size: 20px;
        }
        .lastP {
          height: auto;
          margin-top: 9px;
          padding-bottom: 2px;
          font-size: 20px;
        }
      }
    }
  }
`;
