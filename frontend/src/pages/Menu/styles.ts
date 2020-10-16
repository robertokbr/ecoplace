import styled from 'styled-components';
import { motion } from 'framer-motion';
import { shade } from 'polished';

export const Container = styled.div`
  background: #285c5e;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1100px) {
    min-height: 88rem;
    width: 40rem;
    min-width: 100%;
  }
`;

export const Header = styled.div`
  background: transparent;

  margin: 38px auto 15px 62px;
  img {
    width: 70px;
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
