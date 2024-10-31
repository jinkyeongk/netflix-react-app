
import {  Wrapper } from '../styles/CommonStyle';
import Slider from '../Components/Slider';
import { useRecoilValue } from 'recoil';
import { moviesRecoil } from '../atoms';
import { useHistory } from 'react-router-dom';



 

function Home() {
  
  const history = useHistory();
  const getMovies = useRecoilValue(moviesRecoil);
  history.push('/');

  return  (
    <Wrapper>
    <>
      {getMovies.map((movie,index) => (
        
        <Slider key={movie.keyName} keyContent={movie.content} keyName={movie.keyName} slideTitle={movie.title} hasBanner={index == 0 ? true : false} ></Slider>
        
      ))}
    </>
 </Wrapper>
      );
    }
export default Home;