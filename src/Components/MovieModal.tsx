
import { makeImagePath } from '../utils';
import {  TimesSvg } from '../svg';
import { useHistory } from 'react-router';
import { getDetails, getVideos, IContent, IGetVideos, IVideoContents } from '../api';
import { BigCover, BigMovie, BigOverview, BigTitle, CloseButton, DetailInfo, GenresInfo, Overlay, OverviewContents, Svg, Vote } from '../styles/ModalStyle';
import { useRecoilValue } from 'recoil';
import { IGetMovieDetails, rootRecoil } from '../atoms';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineTimer } from 'react-icons/md';
import { useState } from 'react';
import SimilarList from './SimilarList';
interface IMovieModal {
    clickedContent: IContent;
    content:string;
    keyName:string;
    scrollY:number;

}

function MovieModal({ clickedContent, content, keyName, scrollY }: IMovieModal){
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true); // hover 시작 시
    
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // hover 끝날 시
  };
  const history = useHistory();
  const getRoot = useRecoilValue(rootRecoil);
  const onOverlayClick = () => history.push(getRoot[content]);
  const contentId = clickedContent.id ;
  const { data , isLoading } = useQuery<IGetMovieDetails>(
      { queryKey: [content, contentId], queryFn:
      () => getDetails(content,String(contentId))}
  );
  const { data : videoData , isLoading :videoLoading} = useQuery<IGetVideos>(
      { queryKey: [content, "videos"], queryFn:
      () => getVideos(content,String(contentId))}
  );
  const videoContent = videoData?.results.filter(
      (video) => (video.type === "Teaser" || video.type === "Trailer") 
      && video.official === true
    ) as IVideoContents[];

let videoKey
if(!videoLoading && videoContent.length >0){
  videoKey = videoContent[0].key;
}

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
                  {clickedContent && !videoLoading && !isLoading &&
                  <>
                  <div onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                   {isHovered && (
                     <BigCover >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&mute=1&controls=0`}  // YouTube URL (자동 재생)
                      allow="autoplay; encrypted-media"
                      title="YouTube Video"
                      
                    ></iframe>
                    
                    </BigCover>
                    
                  )}

                  {!isHovered && (
                  <BigCover 
                  style={{
                      backgroundImage: `linear-gradient(to top,black,transparent),
                      URL(${makeImagePath(clickedContent?.backdrop_path, "w500")})` 
                      ,}}
                  /> )}
                  <BigTitle style={{opacity:isHovered?'0':'1',transition: "opacity 0.5s ease"}}
                  >{clickedContent.title?clickedContent.title : clickedContent.name}</BigTitle>
                  </div>
                  
                  <BigOverview>
                    <Vote><FaStar /> Rated : {data?.vote_average.toFixed(2)}</Vote>
                    <DetailInfo> Release Date : {clickedContent?.release_date} <MdOutlineTimer style={{transform:"translateY(3px)"}}/> Run Time : {data?.runtime} min</DetailInfo>
                    <DetailInfo>  {data?.genres?.map((genres => (
                        <GenresInfo key={genres.id} >{genres.name} </GenresInfo>
                      )))}  </DetailInfo>
                    <OverviewContents>{clickedContent.overview}</OverviewContents>
                    {/* { <SimilarList content={content} id ={contentId} key={contentId+"_similarList"} ></SimilarList> } */}
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