import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { theme } from '../theme';

export const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  background-color: black;
`;

export const SliderTitle = styled.p`
  position: absolute;
  left: 5%;
  color: white;
  font-size: 24px;
  font-weight: bolder;
`;

export const Slide = styled.div`
  position: relative;
  width: 90%;
  top: 45px;
  height: auto;
  left: 5%;  
`;

export const Row = styled(motion.div)`
    display: grid;
    position: absolute;
    width: 100%;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;

`;

export const rowVariants={
  hidden: (isNext:boolean) => {
      return {
          x: isNext? window.outerWidth + 5 : -window.outerWidth - 5,
      }
  },
  visible: {
      x: 0,
  },
  exit: (isNext:boolean) => {
      return {
          x: isNext? -window.outerWidth - 5 : window.outerWidth + 5,
      }
  },
};

export const Box = styled(motion.div)<{$bgphoto:string}>`
  width:100%;
  height: 200px;
  font-size:66px;
  background-color: transparent;
  background-image:url(${(props) => props.$bgphoto}) ; 
  background-size: cover;
  background-position: center center;

  cursor: pointer;
  &:first-child{
    transform-origin: center left;
  }
  &:last-child{
    transform-origin: center right;
  }
`;

export const boxVariants={
  normal:{
    scale : 1,
  },
  hover: {
    scale : 1.2,
    y : -50,
    transition:{
      delay:0.2,
      duration:0.1,
      type:"tween"

    }
  }
};

export const Info = styled(motion.div)`
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 5px;
  background-color: ${theme.black.lighter};
  color: white;
  opacity:0;
  h4{
    text-align: center;
    font-size: 18px;
  }
`;

export const infoVariants={
  hover:{
    opacity:0.8,
    transition:{
      delay:0.2,
      duration:0.1,
      type:"tween"

    }
  }
};
export const SliderControl = styled.div`
    position: relative;
    width: 100%;
`;
export const SliderBtn = styled.button`
    position: absolute;
    top: 0; 
    border: none;
    background-color: transparent;
    cursor: pointer;
  
`;
export const PrevBtn = styled(SliderBtn)`
    top:70px;
    left: -70px;
    fill: ${theme.red};
`;
export const NextBtn = styled(SliderBtn)`
    top:70px;
    right: -70px;
    fill: ${theme.red};
`;
export const AngleSvg = styled.svg`
    width: 20px;
    fill: ${theme.red};
    outline: none;
    border: none;
    
`;