import styled from 'styled-components';
import { motion } from 'framer-motion';
import { shade } from 'polished';

export const Container = styled.div`
  background: #285c5e;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  
  @media(max-width: 1100px){
    min-height: 88rem;
    width: 40rem;
    min-width: 100%;
  }
`;

export const Header = styled.div`
  width: 100%;
  max-height: 96px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.08);

  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-left: 50px;
  }

  svg {
    margin-right: 16px;
    color: var(--primary-color);
  }
`;

export const Cards = styled.div`
  margin-top: 96px;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  justify-items: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #231f20;
  border-radius: 10px;
  padding: 20px;
  transition: 0.2s;
  height: 16rem;
  width: 17.5rem;
  position: relative;

  img {
    width: 96px;
    position: absolute;
    top: -16%;
    left: 32%;
  }
  &:hover {
    transform: scale(1.1);
    background: ${shade(-0.5, '#231f20')};
  }

  a {
    text-decoration-line: none;
    display: flex;
    height: 100%;
    align-items: center;
    div {
      padding-top: 40px;
      color: #ffffff;
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
        text-align: center;
      }
      svg {
        color: var(--primary-color);
      }
    }
  }
`;
