
import { useQuery } from '@tanstack/react-query';
import { getMovies, IGetMoviesResult } from "../api";
import { styled } from 'styled-components';
import { makeImagePath } from '../utils';


const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  display: flex;
  height:20vh;
  justify-content: center;
  text-align: center;
`;

const Banner = styled.div<{bgPhoto:string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding:60px;
  background-image: url( ${(props) => props.bgPhoto });
  background-size: cover;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 68px;
  color: white;
`;
const Overview = styled.p`
  width: 50%;
  font-size: 30px;
  color: white;
`;
function Home() {

  const { data , isLoading} = useQuery<IGetMoviesResult>({ queryKey: ["movies", "nowPlaying"], queryFn: getMovies });

    return  (
        <Wrapper>{isLoading ? ( 
          <Loader>Loading...</Loader> 
        ) :(
          <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title }</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
        ) }
        </Wrapper>
      );
    }
export default Home;