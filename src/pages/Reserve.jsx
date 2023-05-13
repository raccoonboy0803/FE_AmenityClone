import tw, { styled } from 'twin.macro';
import React from 'react';
import { useParams } from 'react-router-dom';
import ReserveFilter from '../components/ReserveFilter';

function Reserve() {
  const params = useParams();

  return <ReserveFilter />;
}

export default Reserve;

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
