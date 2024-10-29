import {  useHistory, useLocation, useRouteMatch } from "react-router";
import { IContent, searchEngine } from '../api';
import { useQuery } from '@tanstack/react-query';
import { IGetContentsResult } from '../atoms';
import { Loader, Wrapper } from '../styles/CommonStyle';
import Slider from '../Components/Slider';
import { styled } from 'styled-components';
import MovieModal from '../Components/MovieModal';
import { useScroll } from 'framer-motion';
const SearchWrapper = styled.div`
   position: relative;
   top: 200px;
`;
function Search() {
  const location = useLocation();
  const {scrollY} = useScroll();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const bigMovieMatch = useRouteMatch<{movieId : string}>("/search?keyword="+keyword+"/movies/:movieId");
  const { data, isLoading } = useQuery<IGetContentsResult>({ queryKey: [keyword], queryFn: () => searchEngine(keyword || "")});
  
    //post_path가 없는 경우는 슬라이드 생성이 되지 않으니 뺌
    const contentFilter = (view : IContent) => {
      if(view.backdrop_path !== null || view.poster_path !== null) {
          return true;
      }
      return view;
  };

  let slideContents = data?.results?.filter(contentFilter) as IContent[];
  const clickedMovie = 
    bigMovieMatch?.params.movieId && 
    slideContents.find((movie: { id: number; }) => movie.id === +bigMovieMatch?.params.movieId);


  return (<>
      <Wrapper>{isLoading ? ( <Loader>Loading...</Loader>  ) : (   
        <SearchWrapper>
            <Slider sliderdata={slideContents as IContent[]} slideTitle={'Searching  '+keyword} keyName={'movies'}></Slider>
            {clickedMovie ?(
              <MovieModal clickedContent={clickedMovie as IContent} keyName={'movies'} scrollY={scrollY.get()} />
            ) :null} 
            </SearchWrapper>
           )
        }
      </Wrapper>
    </>
   );
}
export default Search;