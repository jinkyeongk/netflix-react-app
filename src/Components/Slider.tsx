import { AnimatePresence, useScroll } from 'framer-motion';
import { AngleSvg, Box, boxVariants, Info,  infoVariants,  NextBtn, PrevBtn, Row, rowVariants, Slide, SliderControl, SliderTitle, SlideWrapper } from '../styles/SliderStyle';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import { getContents,  IContent, IGetContentResult } from '../api';
import { makeImagePath } from '../utils';
import { AngleLeftSvg, AngleRightSvg } from '../svg';
import { useQuery } from '@tanstack/react-query';
import Banner from './Banner';
import { Loader } from '../styles/CommonStyle';
import TvShowModal from './TvShowModal';



const offset = 6;

interface ISlide {
    keyContent: string;
    slideTitle: string;
    keyName:string;
    hasBanner:boolean;
}

function Slider({keyContent, keyName, slideTitle, hasBanner}:ISlide){

    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [isNext, setIsNext] = useState(true);
    const [leaving,setLeaving] = useState(false);
    const bigContentMatch = useRouteMatch<{contentId : string}>(`/${keyContent}/${keyName}/:contentId`); //[prams.contentId], path, url
    const {scrollY} = useScroll();
    const toggleLeaving = () =>setLeaving((prev)=> !prev);
    const onBoxClicked = (contentId:number) =>{
        history.push(`/${keyContent}/${keyName}/${contentId}`);
    };

    const { data  ,isLoading } = useQuery<IGetContentResult>({ queryKey: [keyContent, keyName], queryFn: () => getContents(keyContent, keyName) });

  
    

        //post_path가 없는 경우는 슬라이드 생성이 되지 않으니 뺌
        const contentFilter = (view : IContent) => {
            
            if(view.backdrop_path != null || view.poster_path != null ) {
                if(view.origin_country && view.original_language == "sp" ) {
                    return false;
                }
            }

            return view;
        };


    let slideContents = data?.results as IContent[];
    let BannerContent = data?.results[0] as IContent;

        if(!isLoading) {
            slideContents = data?.results?.filter(contentFilter) as IContent[];
            BannerContent = data?.results?.filter(contentFilter)[0] as IContent;
            
            if(hasBanner){
                const filteredBannerContent = (contents:IContent[]) => {
                    for(let i = 0; i < contents.length; i++) {
                        const fBannerCon = contents[i] as IContent;
                        if(fBannerCon.overview !== "") {
                            return fBannerCon;
                        }
                    }
                };
                BannerContent = filteredBannerContent(slideContents) as IContent;
                slideContents = slideContents.filter(view => view !== BannerContent);
            }
        }

      const clickedContent = 
      bigContentMatch?.params.contentId && 
      data?.results.find((keyContent: { id: number; }) => keyContent.id === +bigContentMatch?.params.contentId) as IContent;
  
      
    const setPagination = (nextBtn:boolean) => {
        if(nextBtn) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
        if(data) {
            if(leaving) return;
            toggleLeaving();
            const totalContents = slideContents.length - 1;
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
        <>
        {isLoading  ? ( 
          <Loader>Loading...</Loader> 
        ) : ( <>
            {hasBanner && <Banner Bannerdata={BannerContent as IContent} content={keyContent} keyName={keyName}/> }
        <SlideWrapper>
            <SliderTitle>{slideTitle}</SliderTitle>
            <Slide>           
                <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={isNext} >
                    <Row variants={rowVariants} 
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{type:"tween",duration:1}}
                        key={index + keyName}
                        custom={isNext} >
                        {slideContents
                        .slice(offset * index, offset * index + offset)
                        .map((content)=>(
                            <Box 
                            layoutId={content.id + "_" +keyName}
                            key={content.id}
                            variants={boxVariants}
                            whileHover="hover"
                            initial="normal"
                            transition={{type: "tween"}}
                            onClick={() => onBoxClicked(content.id )}
                            $bgphoto={makeImagePath(content.backdrop_path, "w500")} >
                                <Info variants={infoVariants}>
                                    <h4>{content.title ?content.title: content.name}</h4>
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
        </>
     )}
        {bigContentMatch ?(
            <TvShowModal clickedContent={clickedContent as IContent} content={keyContent}  keyName ={keyName} scrollY={scrollY.get()} />
        )  
        :null }
    
    </>);
};

export default Slider;