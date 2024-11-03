
import { makeImagePath } from '../utils';
import {  TimesSvg } from '../svg';
import { useHistory } from 'react-router';
import { getDetails, IContent } from '../api';
import { BigCover, BigMovie, BigOverview, BigTitle, CloseButton, DetailInfo, GenresInfo, Overlay, OverviewContents, Svg, Vote } from '../styles/ModalStyle';
import { useRecoilValue } from 'recoil';
import { IGetMovieDetails, rootRecoil } from '../atoms';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineTimer } from 'react-icons/md';

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
  const contentId = clickedContent.id ;
  const { data , isLoading } = useQuery<IGetMovieDetails>(
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
                    <DetailInfo> Release Date : {clickedContent?.release_date} <MdOutlineTimer style={{transform:"translateY(3px)"}}/> Run Time : {data?.runtime} min</DetailInfo>
                    <DetailInfo>  {data?.genres?.map((genres => (
                        <GenresInfo>{genres.name} </GenresInfo>
                      )))}  </DetailInfo>
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