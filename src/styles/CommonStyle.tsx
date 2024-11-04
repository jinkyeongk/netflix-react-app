import { styled } from 'styled-components';

export const Wrapper = styled.div`
  background-color: black;
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 150vh;
`;

export const Loader = styled.div`
  margin: 300px;
  font-size: 35px;
  justify-content: center;
  text-align: center;
  animation: spin 1s linear infinite;
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const Title = styled.div`
  position: absolute;
  top: 140px;
  width: 100%;
  font-size: 50px;
  text-align: center;

`;

