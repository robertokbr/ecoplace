import styled from 'styled-components';
import { motion } from 'framer-motion';
import menu from '../../assets/menuBack.png';
import menuIcon from '../../assets/menuIcon.svg';
import {} from 'polished';

export const Container = styled.div`
  background: #285c5e url(${menu}) no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100vw;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  justify-items: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #30959b;
  border-radius: 10px;
  padding: 20px;
  color: white;
  transition: 0.2s;
  height: 256px;
  width: 256px;
  position: relative;
  img {
    width: 160px;
    position: absolute;
    top: -24%;
    left: 20%;
  }
  &:hover {
    transform: scale(1.1);
    background: #30959b url(${menuIcon}) no-repeat center;
  }

  a {
    color: #ffffff;
    text-decoration-line: none;
    display: flex;
    height: 100%;
    align-items: center;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      strong {
        font-size: 24px;
      }

      p {
        color: #ffffff99;
        margin: 24px 0;
      }
    }
  }
`;
