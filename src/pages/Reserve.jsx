import tw, { styled } from 'twin.macro';
import React from 'react';
import { useParams } from 'react-router-dom';
import ReserveFilter from '../components/ReserveFilter';
import ReserveCard from '../components/ReserveCard';

function Reserve() {
  const params = useParams();

  return (
    <div style={{ display: 'flex', width: '75%', margin: '0 auto' }}>
      <ReserveFilter />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '20px' }}>
          <TopSort>
            <div>
              <button>낮은 가격 순</button>
              <button>높은 가격 순</button>
            </div>
          </TopSort>
          <ProductWrap>
            <div>
              <h3>숙소 리스트</h3>
            </div>
          </ProductWrap>
        </div>
        <ReserveCard />
        <ReserveCard />
        <ReserveCard />
        <ReserveCard />
        <ReserveCard />
        <ReserveCard />
      </div>
    </div>
  );
}

export default Reserve;

const TopSort = styled.div`
  width: 100%;
  display: inline-block;
  position: relative;
  /* top: 40px; */
  overflow: hidden;
  padding: 0;
  background: #fff;
  box-shadow: none;
  /* text-align: center; */

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

// const ToggleInput = styled.input`
//   ${tw`
//     focus:outline-none
//     w-6
//     h-6
//     rounded-full
//     absolute
//     bg-red-800
//    `}
// `;
// // 사용 예시
