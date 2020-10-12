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
      height: 72px;
      width: 90px;
      background: #34cb79;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      position: relative;
      &::before {
        content: '';
        border-style: solid;
        border-color: #285c5e transparent;
        border-width: 6px 6px 0 6px;
        top: 110%;
        position: absolute;
        left: 50%;
        transform: translatex(-50%);
      }

      img {
        width: 90px;
        height: 55px;
        object-fit: cover;
      }
      p {
        font-size: 10px;
        color: #ffffff;
        max-width: 80px;
      }
    }
  }
`;
export const Controll = styled.div`
  width: 496px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    margin-bottom: 32px;
    display: flex;
    width: 100%;
    background: rgba(0, 0, 0, 0.08);

    a {
      color: white;
      text-decoration: none;
      display: flex;
      align-items: center;
      margin: 24px auto 40px 24px;
    }

    svg {
      margin-right: 16px;
      color: var(--primary-color);
    }
  }

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
    margin-bottom: 16px;
    cursor: pointer;
    &:hover {
      background: ${shade(0.2, '#34CB79')};
    }
  }
`;
export const Items = styled.div`
  max-height: 37rem;
  overflow: auto;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.08);

  border-radius: 10px;
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    list-style: none;
  }
  li {
    background: #f5f5f5;
    border: 2px solid rgba(red, green, blue);
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

    &:hover {
      transform: scale(1.05);
      background: ${shade(0.1, '#e1faec')};
      border: 2px solid #34cb79;
    }
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
      background: #f0f0f5;
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
