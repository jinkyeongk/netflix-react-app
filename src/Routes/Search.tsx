import {  Title, Wrapper } from '../styles/CommonStyle';
import SearchedSlider from '../Components/SearchedSlider';
import { useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';
import { searchRecoil } from '../atoms';



function Search() {
   const location = useLocation();
   const keyword = new URLSearchParams(location.search).get("keyword");
   const getResults = useRecoilValue(searchRecoil);


  return (<>
      <Wrapper>
        <Title>Searched "{keyword}" </Title>
        {getResults.map((search,index) => (
          <SearchedSlider key={index} content = {search.content} keyword ={keyword || "" }></SearchedSlider>  
        ))}
          
         
      </Wrapper>
    </>
   );
}
export default Search;