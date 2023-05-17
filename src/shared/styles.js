import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const Background = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const Logo = styled.h1`
  font-family: jalnan;
  font-size: 1.5rem;
  line-height: 40px;
  cursor: pointer;
`;

export const SignBox = styled.div`
  box-sizing: border-box;
  padding-top: 100px;
  width: 330px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignButton = styled.button`
width: 330px;
height: 60px;
margin-top: 20px;
background-color: ${(props) =>
  props.type === 'kakao' ? '#F7E600' : '#de383f'};
border-radius: 4px;
border: none;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
`;

export const SignP = styled.span`
font-size: 1rem;
font-weight: 600;
color: ${(props) =>
  props.type === 'kakao'
    ? '#3A1D1D'
    : props.type === 'sign'
    ? 'white'
    : 'gray'};
`;