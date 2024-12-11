import { motion } from 'framer-motion';
import { theme } from '../theme';
import { styled } from 'styled-components';

export const SimilarLists = styled.div`
    position: relative;
    top: 10px;
    justify-content: space-between;
    font-weight:bolder;
    font-family: 'Franklin Gothic Medium', Arial, sans-serif;
`;
export const Box = styled(motion.div)<{$bgphoto:string}>`
  position: relative;
  width:100%;
  height: 200px;
  font-size:30px;
  background-color: transparent;
  background-image:url(${(props) => props.$bgphoto}) ; 
  background-size: cover;
  background-position: center center;
`;

export const SimilarContents = styled(motion.div)`
    margin-top: 5px;
    display: grid;
    gap: 5px;
    width: 100%;
    grid-template-columns: repeat(6, 1fr);
`;
export const Info = styled(motion.div)`
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 5px;
  background-color: ${theme.black.lighter};
  color: white;
  opacity:0.9;
  h4{
    text-align: center;
    font-size: 12px;
  }
`;

