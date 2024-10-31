import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { theme } from '../theme';

export const SliderContainer = styled.div`
    position: relative;
    top: 300px;
    margin: 35px 5% 100px;
    justify-content: space-between;
`;

export const SearchedTitle = styled.h2`
    position: absolute;
    top:-40px;
    color: white;
    font-size: 24px;
    font-weight: bolder;
    height: 20px;
`;

export const Box = styled(motion.div)<{$bgphoto:string}>`
  position: relative;
  width:100%;
  height: 200px;
  font-size:66px;
  background-color: transparent;
  background-image:url(${(props) => props.$bgphoto}) ; 
  background-size: cover;
  background-position: center center;

  cursor: pointer;
  &:nth-child(6n+1) {
    transform-origin: center left;
  }
  &:nth-child(6n){
    transform-origin: center right;
  }
  &:hover {
    z-index: 1; // 호버할 때 z-index 증가
  }
`;

export const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    width: 100%;
    grid-template-columns: repeat(6, 1fr);
`;
export const ContentsInfo = styled(motion.div)`
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 5px;
  background-color: ${theme.black.lighter};
  color: white;
  opacity:0.8;
  h4{
    text-align: center;
    font-size: 18px;
  }
`;

export const conInfoVariants={
    hover:{
      opacity:1,
      transition:{
        delay:0.2,
        duration:0.1,
        type:"tween"
  
      }
    }
  };