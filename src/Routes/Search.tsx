import { styled } from 'styled-components';
import { Wrapper } from '../styles/CommonStyle';

const SearchWrapper = styled.div`
   position: relative;
   top: 200px;
`;
function Search() {
  // const location = useLocation();
  // const keyword = new URLSearchParams(location.search).get("keyword");


  return (<>
      <Wrapper>
        <SearchWrapper>
            
            </SearchWrapper>
           
      </Wrapper>
    </>
   );
}
export default Search;