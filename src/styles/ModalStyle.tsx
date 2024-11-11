import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { theme } from '../theme';

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
  z-index: 99;
`;

export const BigMovie = styled(motion.div)`
  position:absolute;
  width:40vw;
  height: 70vh;
  top: 0;
  left:0;
  right:0;
  margin:0 auto;
  border-radius: 15px;
  min-height: 80vh;
  z-index: 100;
  background-color: ${theme.black.lighter};
  overflow-y: scroll;
`;

export const BigCover = styled(motion.div)`
  width: 100%;
  height: 400px;
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  background-size: cover;
  background-position: center center;
`;

export const BigTitle = styled.h3`
  position: relative;
  top:-100px;
  padding:20px;
  color:${theme.white.lighter};
  text-align: left;
  font-size: 46px;
`;

export const BigOverview = styled.div`
  position: relative;
  top:-100px;
  padding:20px;
  color:${theme.white.lighter};
  text-align: left;
`;
export const OverviewContents = styled.div`
  display: block;
  color:${theme.white.lighter};
  text-align: left;
  border-top: double 1px gray;
  padding-top: 5px;
  margin-top: 10px;
`;

export const GenresInfo = styled.button`
  border: none;
  border-radius: 5px;
  background-color: darkgoldenrod;
  color: ${theme.white.lighter};
  cursor: default;
  margin-right: 3px;
`;
export const Vote = styled.div`
    display: block;
    height: 20px;
    font-size: 20px;
    color: orange;
    margin-bottom: 5px;
`;

export const DetailInfo = styled.div`
    display: block;
    height: 20px;
    font-size: 18px;
    color: lightgray;
    margin-right: 5px;
    margin-bottom: 5px;
`;

 export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    padding: 5px;
    border-radius: 42px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    align-items: center;
    justify-items: center;
    border: none;
    outline: none;
`;
export const Svg = styled.svg`
    width: 30px;
    height: 30px;
    fill: #fff;
    outline: none;
    cursor: pointer;
`;
