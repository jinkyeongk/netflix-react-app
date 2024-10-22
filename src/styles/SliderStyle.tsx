import { motion } from 'framer-motion';
import { styled } from 'styled-components';
import { theme } from '../theme';

export const SliderTitle = styled.p`
  position: relative;
  top :0px;
  left: 5%;
  width: 95%;  
  height: 120px;
  margin :0px 5px 20px;
  color: white;
  font-size: 20px;
  font-weight: bolder;
`;

export const Slide = styled.div`
  position: relative;
  width: 90%;
  top: -100px;
  left: 5%;
  
`;

export const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    position: absolute;
    width: 100%;
`;

export const rowVariants={
  hidden:{
    x:window.outerWidth +5,
  },
  visible:{
    x:0,
  },
  exit:{
    x:-window.outerWidth -5,
  },

};

export const Box = styled(motion.div)<{$bgphoto:string}>`
  height: 200px;
  font-size:66px;
  background-color: white;
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
  bottom: 0;
  width: 100%;
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
`;
export const SliderBtn = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    top: 0; 
  
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