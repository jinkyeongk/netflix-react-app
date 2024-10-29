
import { useQuery } from '@tanstack/react-query';
import { getContents,  getTopRatedMovies, IContent, IGetContentResult } from "../api";
import {  useScroll } from"framer-motion";
import {  useRouteMatch } from 'react-router-dom';
import Banner from '../Components/Banner';
import { Loader, Wrapper } from '../styles/CommonStyle';
import Slider from '../Components/Slider';
import MovieModal from '../Components/MovieModal';



 

function Home() {
  
  const bigMovieMatch = useRouteMatch<{movieId : string}>("/movies/:movieId"); //[prams.movieId], path, url
  const { data  ,isLoading } = useQuery<IGetContentResult>({ queryKey: ["movies", "now_playing"], queryFn: () => getContents("movie", "now_playing") });
  const { data : dataTopRated ,isLoading : isLoadingTopRated } = useQuery<IGetContentResult>({ queryKey: ["movies", "top_rated"], queryFn: getTopRatedMovies });
  const {scrollY} = useScroll();
  //post_path가 없는 경우는 슬라이드 생성이 되지 않으니 뺌
  const contentFilter = (view : IContent) => {
      if(view.backdrop_path !== null || view.poster_path !== null) {
        return true;
      }
      return view;
  };

  let slideContents = data?.results as IContent[];
  let slide2Contents = dataTopRated?.results as IContent[];
  let BannerContent = data?.results[0] as IContent;

  if(!isLoading && data){
    slideContents = data?.results?.filter(contentFilter) as IContent[];
    BannerContent = data?.results?.filter(contentFilter)[0] as IContent;
    slide2Contents = dataTopRated?.results?.filter(contentFilter) as IContent[];
  }
  console.log(data);
    const clickedMovie = 
    bigMovieMatch?.params.movieId && 
    data?.results.find((movie: { id: number; }) => movie.id === +bigMovieMatch?.params.movieId) as IContent;

  return  (
        <Wrapper>{isLoading  && isLoadingTopRated ? ( 
          <Loader>Loading...</Loader> 
        ) : (
          <>
          <Banner Bannerdata={BannerContent as IContent}  keyName={'movies'}/> 
          <Slider sliderdata={slideContents as IContent[]} slideTitle={'Now Playing'} keyName={'movies'}></Slider>
            {bigMovieMatch ?(
              <MovieModal clickedContent={clickedMovie as IContent} keyName={'movies'} scrollY={scrollY.get()} />
            )            
            :null }
        </>
        ) }
        
        </Wrapper>
      );
    }
export default Home;