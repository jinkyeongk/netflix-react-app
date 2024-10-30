import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { theme } from '../theme';
import { makeImagePath } from '../utils';
import {  TimesSvg } from '../svg';
import { useHistory } from 'react-router';
import { IContent } from '../api';
import { useRecoilValue } from 'recoil';
import { rootRecoil } from '../atoms';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position:absolute;
  width:40vw;
  height: 70vh;
  top: 0;
  left:0;
  right:0;
  margin:0 auto;
  border-radius: 15px;
  min-height: 80vh;
  z-index: 1;
  background-color: ${theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  position: relative;
  top:-100px;
  padding:20px;
  color:${theme.white.lighter};
  text-align: left;
  font-size: 46px;
`;

const BigOverview = styled.p`
  position: relative;
  top:-100px;
  padding:20px;
  color:${theme.white.lighter};
  text-align: left;
`;

 const CloseButton = styled.button`
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
 const Svg = styled.svg`
    width: 30px;
    height: 30px;
    fill: #fff;
    outline: none;
    cursor: pointer;
`;
interface ITvShowModal {
    clickedContent: IContent;
    keyName:string,
    scrollY:number;

}

function TvShowModal({ clickedContent, keyName, scrollY }: ITvShowModal){
    
    const history = useHistory();
    //const onOverlayClick = () => history.push(`/`);
    const getRoot = useRecoilValue(rootRecoil);
    const onOverlayClick = () => history.push(getRoot[keyName]);
    const contentId = String(clickedContent.id) ;
  

    return (
         <AnimatePresence>
                <Overlay 
                key={keyName}
                onClick={onOverlayClick} 
                exit={{opacity:0}} 
                animate={{opacity:1}} 
                />
                <BigMovie
                  transition={{type: "tween"}}
                  style ={{ top: scrollY + 150 }}
                  layoutId={contentId + "_" + keyName}
                >
                    {clickedContent &&
                    <>
                    <BigCover 
                    style={{
                        backgroundImage: `linear-gradient(to top,black,transparent),
                        URL(${makeImagePath(clickedContent?.backdrop_path)})` 
                        ,}}
                    />
                    <BigTitle>{clickedContent.title?clickedContent.title : clickedContent.name}</BigTitle>
                    <BigOverview>{clickedContent.overview}</BigOverview>
                    </>}
                    <CloseButton onClick={onOverlayClick}>
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <TimesSvg/>
                        </Svg>
                    </CloseButton>
                </BigMovie>
                </AnimatePresence>
        
        ); 
}

export default TvShowModal;