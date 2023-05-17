import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as st from '../shared/styles';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import {
  QueryClient,
  useMutation,
  useQuery,
} from 'react-query';
import Cookies from 'js-cookie';
import { AiOutlineClose } from 'react-icons/ai';

function Mypage() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userEmail') === null) {
      alert('로그인 후에 이용 가능합니다.');
      navigate('/login');
    }
  });

  const accessToken = Cookies.get('accessToken');
  const refreshtoken = Cookies.get('refreshToken');
  const user = localStorage.getItem('userEmail');

  const getMypage = async () => {
    try {
      const config = {
        headers: {
          ACCESS_KEY: `Bearer ${accessToken}`,
          REFRESH_KEY: `Bearer ${refreshtoken}`,
        },
      };
      const response = await axios.get('/api/reserve/myreservelist', config);
      const result = response.data.filter((item) => item.userEmail === user);
      return result;
    } catch (err) {
      if (!err?.response) {
        alert('서버의 응답이 없습니다');
      } else {
        alert('조회 권한이 없습니다');
      }
    }
  };

  const { data: mypage } = useQuery('mypage', () => getMypage());

  const deleteReserve = async ([reserveId, accessToken, refreshtoken]) => {
    try {
      const config = {
        headers: {
          ACCESS_KEY: `Bearer ${accessToken}`,
          REFRESH_KEY: `Bearer ${refreshtoken}`,
        },
      };
      return await axios.delete(
        `/api/reserve/myreservelist/delete/${reserveId}`,
        config,
      );
    } catch (err) {
      if (!err?.response) {
        alert('서버의 응답이 없습니다');
      } else {
        alert('조회 권한이 없습니다');
      }
    }
  };

  const deleteMutation = useMutation(deleteReserve, {
    onSuccess: () => {
      QueryClient.invaildateQueries('mypage');
    },
  });

  const onClickDel = (reserveId) => {
    if (window.confirm('예약을 취소하시겠습니까?')) {
      deleteMutation.mutate([reserveId.id, accessToken, refreshtoken])
      alert('예약이 취소 되었습니다.')
    } else {
      return false
    }
  }

  useEffect(() => {
    console.log(mypage);
  },[mypage]);

  // console.log('조회:', mypage);

  return (
    <>
      <MyInfoBox>
        <MyInfo>
          <MyInfoH>내정보</MyInfoH>
        </MyInfo>
      </MyInfoBox>

      <st.Background>
        <MypageBg>
          <LeftMenu>
            <Text>포인트</Text>
            <Text>쿠폰함</Text>
            <Text reserve="reserve">예약 내역</Text>
            <Text>내 정보 관리</Text>
            <Text>알림</Text>
            <Text>여기어때 상품권 잔액 조회</Text>
          </LeftMenu>
          {mypage?.length === 0 ? (
            <NotInfo>
              <Text notfound="notfound">예약 내역이 없습니다.</Text>
              <TextCenter>
                <Text>최저가로 예약 가능한</Text>
                <Text>숙소들을 지금 만나세요!</Text>
              </TextCenter>
              <MoreBtn onClick={() => navigate('/product/search')}>
                다양한 숙소 보러가기
              </MoreBtn>
            </NotInfo>
          ) : (
            <Info>
              {mypage?.map((item) => {
                return (
                  <ReservBox key={item.id}>
                    <ReservImg
                      style={{
                        backgroundImage: `url(${item.amenityImg})`,
                      }}
                    >
                      <AiOutlineClose style={{ cursor: 'pointer' }} 
                      onClick={() => onClickDel({id: item.id})}/>
                    </ReservImg>
                    <ResrveTag>예약확정</ResrveTag>
                    <div
                      style={{
                        lineHeight: '1px',
                        textAlign: 'center',
                        width: '100%',
                      }}
                    >
                      <ResrvText place="place">{item.amenityNm}</ResrvText>
                      <ResrvText>
                        체크인:{' '}
                        {item.reserveEndDate.substr(5).replace('-', '.')}
                        &nbsp;·&nbsp;
                        {Number(item.reserveEndDate.slice(8)) -
                          Number(item.reserveStartDate.slice(8))}
                        박
                      </ResrvText>
                    </div>
                  </ReservBox>
                );
              })}
            </Info>
          )}
        </MypageBg>
      </st.Background>
    </>
  );
}

export default Mypage;

const MyInfoBox = styled.div`
  width: 100%;
  height: 200px;
  background-color: #de383f;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -80px;
`;

const MyInfo = styled.div`
  width: 930px;
  height: 200px;
`;

const MyInfoH = styled.h1`
  color: white;
  line-height: 200px;
`;

const MypageBg = styled.div`
  width: 930px;
  height: 800px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
`;

const LeftMenu = styled.div`
  width: 250px;
  height: 800px;
`;

const NotInfo = styled.div`
  width: 630px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResrveTag = styled.div`
  width: 45px;
  height: 15px;
  background-color: #de383f;
  color: white;
  font-size: 0.7rem;
  margin-top: 15px;
`;

const Info = styled.div`
  width: 630px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
`;

const ReservBox = styled.div`
  width: 300px;
  height: 280px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const ReservImg = styled.div`
  background-position: center;
  background-size: cover;
  background-color: black;
  width: 100%;
  height: 150px;
  color: white;
  font-size: 1.4rem;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 10px;
`;

const ResrvText = styled.p`
  font-weight: ${(props) => (props.place ? 'bold' : '')};
  color: ${(props) => (props.place ? 'black' : 'gray')};
  font-size: ${(props) => (props.place ? '1' : '0.9')}rem;
`;

const Text = styled.p`
  font-size: ${(props) => (props.notfound ? '1.1' : '1')}rem;
  color: ${(props) =>
    props.reserve ? '#de383f' : props.notfound ? 'black' : 'gray'};
  font-weight: bold;
`;

const TextCenter = styled.div`
  line-height: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MoreBtn = styled.button`
  width: 200px;
  height: 50px;
  border: 2px solid #de383f;
  background-color: white;
  color: #de383f;
  font-size: 0.95rem;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
`;
