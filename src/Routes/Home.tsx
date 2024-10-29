
import { useQuery } from '@tanstack/react-query';
import { getMovies, IContent, IGetMoviesResult } from "../api";
import {  useScroll } from"framer-motion";
import {  useRouteMatch } from 'react-router-dom';
import Banner from '../Components/Banner';
import { Loader, Wrapper } from '../styles/CommonStyle';
import Slider from '../Components/Slider';
import MovieModal from '../Components/MovieModal';



 

function Home() {
  
  const bigMovieMatch = useRouteMatch<{movieId : string}>("/movies/:movieId"); //[prams.movieId], path, url
  const { data  ,isLoading } = useQuery<IGetMoviesResult>({ queryKey: ["movies", "nowPlaying"], queryFn: getMovies });
  const {scrollY} = useScroll();
  //post_path가 없는 경우는 슬라이드 생성이 되지 않으니 뺌
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
    const clickedMovie = 
    bigMovieMatch?.params.movieId && 
    data?.results.find((movie: { id: number; }) => movie.id === +bigMovieMatch?.params.movieId) as IContent;

  return  (
        <Wrapper>{isLoading ? ( 
          <Loader>Loading...</Loader> 
        ) : (
          <>
          <Banner Bannerdata={BannerContent as IContent} /> 
          <Slider Sliderdata={slideContents as IContent[]} slideTitle={"Now Playing"} ></Slider>
            {bigMovieMatch ?(
              <MovieModal clickedContent={clickedMovie as IContent}  scrollY={scrollY.get()} />
            )            
            :null }
        </>
        ) }
        </Wrapper>
      );
    }
export default Home;