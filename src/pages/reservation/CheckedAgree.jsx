import React, { useState } from 'react';
import styled from 'styled-components';
import * as st from '../../shared/styles';

function CheckedAgree() {
  const data = [
    { id: 0, title: '숙소이용규칙 및 취소/환불규정 동의' },
    { id: 1, title: '개인정보 수집 및 이용 동의' },
    { id: 2, title: '개인정보 제 3자 제공 동의' },
    { id: 3, title: '만 14세 이상 확인' },
  ];

  const [check, setCheck] = useState([]);

  const handleSignle = (checked, id) => {
    if (checked) {
      setCheck((prev) => [...prev, id]);
    } else {
      setCheck(check.filter((item) => item !== id));
    }
  };

  const handleAll = (checked) => {
    if (checked) {
      const idArray = [];
      data.forEach((item) => idArray.push(item.id));
      setCheck(idArray);
    } else {
      setCheck([]);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <st.Row>
        <CheckInput
          type="checkbox"
          name="selectAll"
          onChange={(e) => handleAll(e.target.checked)}
          checked={check.length === data.length ? true : false}
        />
        &nbsp;
        <CheckedP>전체 동의</CheckedP>
      </st.Row>
      <div style={{ marginBottom: '10px' }}></div>
      {data.map((data, key) => (
        <st.Row key={key} style={{ marginBottom: '10px' }}>
          <CheckInput
            type="checkbox"
            name={`select-${data.id}`}
            onChange={(e) => handleSignle(e.target.checked, data.id)}
            checked={check.includes(data.id) ? true : false}
          />
          &nbsp;
          <CheckedP content="content">{data.title}</CheckedP>&nbsp;<CheckedP required="required">(필수)</CheckedP>
        </st.Row>
      ))}
    </div>
  );
}

export default CheckedAgree;

const CheckInput = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid black;
  border-radius: 2px;
  cursor: pointer;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #de383f;
  }
`;

const CheckedP = styled.span`
    font-size: 0.95rem;
    color: ${props => props.content ? 'gray' : (props => props.required ? '#de383f' : 'black')};
    font-weight: ${props => props.content ? '' : (props => props.required ? '' : 'bold')};
    text-decoration-line: ${props => props.content ? 'underline' : ''};
`