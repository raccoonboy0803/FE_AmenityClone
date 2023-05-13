import React from 'react'
import styled from 'styled-components'
import mainImage from '../images/mainspot_2305.png'
import NavIcons from './main/NavIcons'

function Main() {
  return (
    <MainBackground>
        <MainImage />
        <NavIcons />
    </MainBackground>
  )
}

export default Main

const MainBackground = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MainImage = styled.div`
    margin-top: 110px;
    width: 60%;
    height: 460px;
    background-image: url(${mainImage});
    background-size: cover;
`