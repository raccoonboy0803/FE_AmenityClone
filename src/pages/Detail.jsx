import tw, { styled } from 'twin.macro';

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

const Detail = () => {
  return <ToggleInput />;
};

export default Detail;
