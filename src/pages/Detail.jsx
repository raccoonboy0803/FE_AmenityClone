import tw, { styled } from 'twin.macro';
import React from 'react';

function Detail() {
  return (
    <div>
      <ToggleInput></ToggleInput>
    </div>
  );
}

export default Detail;

const ToggleInput = styled.input`
  ${tw`
    focus:outline-none
    w-6
    h-6
    rounded-full
    absolute
    bg-red-800
   `}
`;
// 사용 예시
