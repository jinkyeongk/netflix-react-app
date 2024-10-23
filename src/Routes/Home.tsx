
import { useQuery } from '@tanstack/react-query';
import { getMovies, IContent, IGetMoviesResult } from "../api";
import styled  from "styled-components";
import { motion,AnimatePresence,useScroll } from"framer-motion";
import { makeImagePath } from '../utils';
import { theme } from "../theme";
import { useHistory, useRouteMatch } from 'react-router-dom';
import {  TimesSvg } from '../svg';
import Banner from '../Components/Banner';
import { Loader, Wrapper } from '../styles/CommonStyle';
import Slider from '../Components/Slider';



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
  left:0;
  right:0;
  margin:0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  position: relative;
  top:-130px;
  padding:20px;
  color:${theme.white.lighter};
  text-align: left;
  font-size: 46px;
`;

const BigOverview = styled.p`
  position: relative;
  top:-200px;
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
`;
 

function Home() {
  
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{movieId : string}>("/movies/:movieId");
  const {scrollY} = useScroll();
  const { data  ,isLoading } = useQuery<IGetMoviesResult>({ queryKey: ["movies", "nowPlaying"], queryFn: getMovies });
  
  //post_path가 없는 경우는 슬라이드 생성이 되지 않으니 뺌
  //
  const contentFilter = (view : IContent) => {
      if(view.backdrop_path !== null || view.poster_path !== null) {
          return view;
      }
  };

  let slideContents = data?.results as IContent[];
  let BannerContent = data?.results[0] as IContent;

  if(!isLoading && data){
    slideContents = data?.results?.filter(contentFilter) as IContent[];
    BannerContent = data?.results?.filter(contentFilter)[0] as IContent;
  }

  const onOverlayClick = () => history.push("/");

  const clickedMovie = 
    bigMovieMatch?.params.movieId && 
    data?.results.find((movie: { id: number; }) => movie.id === +bigMovieMatch.params.movieId);
  
  return  (
        <Wrapper>{isLoading ? ( 
          <Loader>Loading...</Loader> 
        ) : (
          <>
          <Banner data={BannerContent as IContent} /> 
          <Slider data={slideContents as IContent[]} slideTitle={"Now Playing"} ></Slider>
          <AnimatePresence>
            {bigMovieMatch ?(
              <>
              <Overlay 
                onClick={onOverlayClick} 
                exit={{opacity:0}} 
                animate={{opacity:1}} 
                />
                 
                <BigMovie
                style ={{ top: scrollY.get() + 150 }}
                layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie &&
                   <>
                   <BigCover 
                    style={{
                      backgroundImage: `linear-gradient(to top,black,transparent),
                       URL(${makeImagePath(clickedMovie.backdrop_path, "w500")})` 
                       ,}}
                    />
                    <BigTitle>{clickedMovie.title}</BigTitle>
                    <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>}
                    <CloseButton onClick={onOverlayClick}>
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                         <TimesSvg/>
                        </Svg>
                    </CloseButton>
                </BigMovie>
               
                </>  
              ) :null }
          </AnimatePresence>
        </>
        ) }
        </Wrapper>
      );
    }
export default Home;