import { AnimatePresence } from 'framer-motion';
import { AngleSvg, Box, boxVariants, Info, infoVariants, NextBtn, PrevBtn, Row, rowVariants, Slide, SliderControl, SliderTitle, SlideWrapper } from '../styles/SliderStyle';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { IContent } from '../api';
import { makeImagePath } from '../utils';
import { AngleLeftSvg, AngleRightSvg } from '../svg';


const offset = 6;

interface ISlide {
    sliderdata: IContent[];
    slideTitle: string;
    keyName:string;
}

function Slider({sliderdata ,slideTitle, keyName}:ISlide){

    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [isNext, setIsNext] = useState(true);
    const [leaving,setLeaving] = useState(false);
    const toggleLeaving = () =>setLeaving((prev)=> !prev);
    const onBoxClicked = (contentId:number) =>{
        history.push(`/${keyName}/${contentId}`);
    };
    const setPagination = (nextBtn:boolean) => {
        if(nextBtn) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
        if(sliderdata) {
            if(leaving) return;
            toggleLeaving();
            const totalContents = sliderdata.length - 1;
            const maxIndex = Math.floor(totalContents / offset) - 1;
            return maxIndex;
        }
    };
      const increaseIndex = () => {
        const maxIndex = setPagination(true) as number;
        setIndex((prev) => prev === maxIndex? 0 : prev + 1);
    };
    const decreaseIndex = () => {
        const maxIndex = setPagination(false) as number;
        setIndex((prev) => prev === 0? maxIndex : prev - 1);
    };
    return (
        <SlideWrapper>
        <SliderTitle>{slideTitle}</SliderTitle>
          <Slide>           
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}  
                            custom={isNext} >
            <Row variants={rowVariants} 
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{type:"tween",duration:1}}
            key={index}
            custom={isNext} >
            {sliderdata
              .slice(1)  // 0:메인 페이지 , 1~18: 슬라이드 리스트 (6개씩의 frame 3 pages)
              .slice(offset * index, offset * index + offset)
              .map((content)=>(
                <Box 
                  layoutId={content.id + ""  }
                  key={content.id}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  onClick={() => onBoxClicked(content.id )}
                  $bgphoto={makeImagePath(content.backdrop_path, "w500")} >
                    <Info variants={infoVariants}>
                      <h4>{`${keyName}`=="movies"?content.title: content.name}</h4>
                    </Info>
               </Box>
              ))}
            </Row>
            <SliderControl>
                <PrevBtn onClick={decreaseIndex} onMouseEnter={() => setIsNext(false)}>
                    <AngleSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <AngleLeftSvg />
                    </AngleSvg>
                </PrevBtn>
                <NextBtn onClick={increaseIndex} onMouseEnter={() => setIsNext(true)}>
                    <AngleSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <AngleRightSvg></AngleRightSvg>
                    </AngleSvg>
                </NextBtn>
            </SliderControl>
            </AnimatePresence>
          </Slide>
        </SlideWrapper>
    );
};

export default Slider;