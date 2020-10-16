import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  .leaflet-container {
    flex: 1;
    height: 100%;
    border-radius: 8px;
  }
  .marker {
    div {
      border-radius: 5px;
      height: 90px;
      width: 120px;
      background: #34cb79;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      position: relative;
      img {
        width: 120px;
        height: 75px;
        object-fit: cover;
      }
      p {
        font-size: 10px;
        font-weight: bold;
        color: #ffffff;
        max-width: 80px;
      }
    }
  }
`;

export const Header = styled.div`
  background: transparent;
  margin: 30px auto 30px 30px;

  img {
    width: 70px;
  }
`;

export const Controll = styled.div`
  flex: 1;
  max-width: 496px;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 260px;
    height: 64px;
    background: var(--primary-color);
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    transition: background-color 0.2s;
    margin-bottom: 70px;
    cursor: pointer;
    &:hover {
      background: ${shade(0.2, '#34CB79')};
    }
  }
`;
export const Items = styled.div`
  max-height: 37rem;
  overflow: auto;
  padding: 10px 10px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    list-style: none;
  }
  li {
    background: #f5f5f5;
    border: 2px solid transparent;

    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: 0.2s;
  }

  span {
    flex: 1;
    margin-top: 12px;

    display: flex;
    align-items: center;
    color: var(--title-color);
  }

  li.selected {
    background: #e1faec;
    border: 2px solid #34cb79;
  }
`;

export const Selector = styled.div`
  display: flex;
  padding: 20px;

  div {
    flex: 1;

    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    &:last-child {
      margin-left: 24px;
    }

    label {
      font-size: 14px;
      margin-bottom: 8px;
      color: var(--title-color);
      font-weight: bold;
    }
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      flex: 1;
      background: #dedde1;
      border-radius: 8px;
      border: 0;
      padding: 16px 24px;
      font-size: 16px;
      color: #6c6c80;

      &::placeholder {
        color: #a0a0b2;
      }
      option {
      }
    }
  }
`;
