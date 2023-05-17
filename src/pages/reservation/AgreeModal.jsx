import React from 'react';
import Portal from '../../Portal';
import styled from 'styled-components';
import * as st from '../../shared/styles';
import { AiOutlineClose } from "react-icons/ai";

function AgreeModal() {
  return (
    <Portal>
      <ModalBg>
        <ModalContent>
          <st.Row style={{justifyContent: 'space-between'}}>
            <ContentP title>숙소이용규칙 및 취소/환불 규정(필수)</ContentP>
            <AiOutlineClose style={{fontSize: '1.5rem', cursor: 'pointer'}} />
          </st.Row>
          <ContentP>이용규칙</ContentP>
          <ContentP list="list">
            <li>최대 인원 초과 시 입실 불가합니다.</li>
          </ContentP>
          <ContentP  list="list">
            <li>정원 기준 요금 외 인원 추가 요금은 현장결제입니다.</li>
          </ContentP>
          <ContentP  list="list">
            <li>제공 이미지는 배정된 객실과 다를 수 있습니다.</li>
          </ContentP>
          <ContentP  list="list">
            <li>제공 정보는 숙소의 사정에 따라 변경될 수 있습니다.</li>
          </ContentP>
          <ContentP  list="list">
            <li>미성년자는 보호자 동반 시 투숙이 가능합니다.</li>
          </ContentP>
          <ContentP  list="list">
            <li>체크인 시 배정의 경우, 객실과 베드타입을 보장하지 않습니다.</li>
          </ContentP>
          <ContentP  list="list">
            <li>
              객실 타입에 시간이 별도 기재된 경우, 체크인/아웃 시간이 상이할 수
              있습니다.
            </li>
          </ContentP>
          <ContentP  list="list">
            <li>
              조식, 인원, 침구, 침대 등 추가는 예약하신{' '}
              <span style={{ color: '#de383f' }}>숙소로 요청 및 결제</span>{' '}
              가능합니다.
            </li>
          </ContentP>
          <ContentP  list="list">
            <li>
              업체 현장에서 객실 컨디션 및 서비스로 인해 발생된 분쟁은
              여기어떠니에서 책임지지 않습니다.
            </li>
          </ContentP>

          <ContentP>취소/환불규정</ContentP>
          <ContentP  list="list">
            <li>
              여기어떠니에서 판매되는 국내
              호텔/리조트/펜션/게스트하우스/캠핑/홈앤빌라 상품은 예약/결제 후
              10분 이내에는 무료취소 가능합니다. (단. 체크인 시간 경과 시
              취소불가)
            </li>
          </ContentP>
          <ContentP  list="list">
            <li>숙소 사정에 의해 취소 발생 시 100% 환불이 가능합니다.</li>
          </ContentP>
          <ContentP  list="list">
            <li>
              예약 상품 별 숙소 정보에 기재된 취소, 환불 규정을 반드시 확인 후
              이용해주시기 바랍니다.
            </li>
          </ContentP>
        </ModalContent>
      </ModalBg>
    </Portal>
  );
}

export default AgreeModal;

const ModalBg = styled.div`
  z-index: 5000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: -0px;
`;

const ModalContent = styled.div`
  width: 500px;
  height: 600px;
  background-color: white;
  margin: auto;
  margin-top: 150px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 20px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ContentP = styled.p`
  font-size: ${(props) => (props.title ? '1.1' : '0.95')}rem;
  font-weight: ${(props) => (props.list ? '' : 'bold')};
  color: ${(props) =>
    props.list ? 'gray' : (props) => (props.import ? '#de383f' : 'black')};
`;
