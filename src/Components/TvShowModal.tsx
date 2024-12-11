import { AnimatePresence } from 'framer-motion';
import { makeImagePath } from '../utils';
import {  TimesSvg } from '../svg';
import { useHistory } from 'react-router';
import { getDetails, IContent } from '../api';
import { useRecoilValue } from 'recoil';
import { IGetDetails, rootRecoil } from '../atoms';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from "react-icons/fa6";
import { BigCover, BigMovie, BigOverview, BigTitle, CloseButton, DetailInfo, GenresInfo, Overlay, OverviewContents, Svg, Vote } from '../styles/ModalStyle';
import SimilarList from './SimilarList';
import CreditList from './CreditList';

interface ITvShowModal {
    clickedContent: IContent;
    content:string;
    keyName:string;
    scrollY:number;

}

function TvShowModal({ clickedContent, content,keyName, scrollY }: ITvShowModal){
    
  const history = useHistory();
    const getRoot = useRecoilValue(rootRecoil);
    const onOverlayClick = () => history.push(getRoot[content]);
    const contentId = clickedContent.id ;
    const { data, isLoading } = useQuery<IGetDetails>(
      { queryKey: [content, contentId], queryFn:
      () => getDetails(content,String(contentId))}
  );

    return (<>
         <AnimatePresence>
                <Overlay 
                key={keyName}
                onClick={onOverlayClick} 
                exit={{opacity:0}} 
                animate={{opacity:1}} 
                />
                <BigMovie
                  style ={{ top: scrollY + 150 }}
                  layoutId={contentId + "_" +  keyName}
                >
                    {clickedContent && !isLoading &&
                    <>
                    <BigCover 
                    style={{
                        backgroundImage: `linear-gradient(to top,black,transparent),
                        URL(${makeImagePath(clickedContent?.backdrop_path)})` 
                        ,}}
                    />
                    <BigTitle>{clickedContent.title?clickedContent.title : clickedContent.name}</BigTitle>
                    <BigOverview>
                    <Vote><FaStar /> Rated : {data?.vote_average.toFixed(2)}</Vote>
                    <DetailInfo>  {data?.number_of_seasons} Seasons / {data?.number_of_episodes} episodes </DetailInfo>
                    <DetailInfo>  First air date : {data?.first_air_date}  </DetailInfo>
                    <DetailInfo>  {data?.genres?.map((genres => (
                        <GenresInfo  key={genres.id} > {genres.name} </GenresInfo>
                      )))}  </DetailInfo>
                      <OverviewContents>{clickedContent.overview}</OverviewContents>
                      <CreditList id={contentId} content={content} />
                      <SimilarList content={content} id ={contentId} key={contentId} ></SimilarList>  
                      </BigOverview>
                    </>}
                    <CloseButton onClick={onOverlayClick}>
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <TimesSvg/>
                        </Svg>
                    </CloseButton>
                </BigMovie>
                </AnimatePresence>
                </>
        ); 
}

export default TvShowModal;