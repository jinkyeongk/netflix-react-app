
import { makeImagePath } from '../utils';
import {  TimesSvg } from '../svg';
import { useHistory } from 'react-router';
import { getDetails, IContent } from '../api';
import { BigCover, BigMovie, BigOverview, BigTitle, CloseButton, DetailInfo, Overlay, OverviewContents, Svg, Vote } from '../styles/ModalStyle';
import { useRecoilValue } from 'recoil';
import { IGetMovieDetails, rootRecoil } from '../atoms';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa6';

interface IMovieModal {
    clickedContent: IContent;
    content:string;
    keyName:string;
    scrollY:number;

}

function MovieModal({ clickedContent, content, keyName, scrollY }: IMovieModal){
    
  const history = useHistory();
  const getRoot = useRecoilValue(rootRecoil);
  const onOverlayClick = () => history.push(getRoot[content]);
  console.log(getRoot[content]);
  const contentId = clickedContent.id ;
  const { data } = useQuery<IGetMovieDetails>(
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
                  {clickedContent &&
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
                  <DetailInfo> Release Date : {clickedContent?.release_date}</DetailInfo>
                  <DetailInfo> Run Time : {data?.runtime}</DetailInfo>
                    <OverviewContents>{clickedContent.overview}</OverviewContents>
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

export default MovieModal;