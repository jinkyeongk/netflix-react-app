
import { useRouteMatch } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Loader, Wrapper } from '../styles/CommonStyle';
import { useScroll } from 'framer-motion';
import {  getContents, IContent, IGetContentResult } from '../api';
import TvShowModal from '../Components/TvShowModal';
import Slider from '../Components/Slider';
import Banner from '../Components/Banner';



function Tv(){
    
    const bigTvShowMatch = useRouteMatch<{showId : string}>("/tv/:showId"); //[prams.showId], path, url
    const { data  ,isLoading } = useQuery<IGetContentResult>({ queryKey: ["tvShow", "onTheAir"], queryFn: () => getContents("tv", "on_the_air") });
    const {scrollY} = useScroll();

    //post_path가 없는 경우는 슬라이드 생성이 되지 않으니 뺌
    const contentFilter = (view : IContent) => {
        if(view.backdrop_path != null || view.poster_path != null ||view.original_language !== "US") {
                return true;
        }
        return view;
    };

    let slideContents = data?.results as IContent[];
    let BannerContent = data?.results[0] as IContent;
  
    if(!isLoading && data){
        slideContents = data?.results?.filter(contentFilter) as IContent[];
        BannerContent = data?.results?.filter(contentFilter)[0] as IContent;
      }
      
    const clickedContent = 
    bigTvShowMatch?.params.showId && 
    data?.results.find((tv: { id: number; }) => tv.id === +bigTvShowMatch?.params.showId) as IContent;


    return (
        <Wrapper>{isLoading  ? ( 
          <Loader>Loading...</Loader> 
        ) : (
          <>
          <Banner Bannerdata={BannerContent as IContent} keyName={"tv"}/> 
          <Slider sliderdata={slideContents as IContent[]} slideTitle={"On The Air"} keyName={"tv"}></Slider>
            {bigTvShowMatch ?(
              <TvShowModal clickedContent={clickedContent as IContent} keyName={'tv'} scrollY={scrollY.get()} />
            )            
            :null }
        </>
        ) }
        
        </Wrapper>
      );
}

export default Tv;