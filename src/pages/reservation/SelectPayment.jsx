import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

function SelectPayment() {
  const payment = [
    { value: 'kako', label: '카카오페이' },
    { value: 'toss', label: '토스페이' },
    { value: 'card', label: '신용/체크 카드' },
    { value: 'naver', label: '네이버페이' },
    { value: 'payco', label: '페이코' },
    { value: 'corpcard', label: '법인카드' },
    { value: 'mobile', label: '휴대폰 결제' },
  ];

  const [selectPayment, setSelectPayment] = useState(payment[0]);
  return (
    <>
      <SelectPay
        options={payment}
        onChange={setSelectPayment}
        defaultValue={payment[0]}
        theme={(theme) => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            primary: 'silver',
          },
        })}
      />
    </>
  );
}

export default SelectPayment;

const SelectPay = styled(Select)`
  width: 250px;
  height: 30px;
`;