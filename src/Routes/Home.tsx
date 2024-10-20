
import { useQuery } from '@tanstack/react-query';
import { getMovies, IGetMoviesResult } from "../api";
import styled  from "styled-components";
import { motion,AnimatePresence,useScroll } from"framer-motion";
import { makeImagePath } from '../utils';
import { useState } from 'react';
import { theme } from "../theme";
import { useHistory, useRouteMatch } from 'react-router-dom';
import { get } from 'react-hook-form';



const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  display: flex;
  height:20vh;
  justify-content: center;
  text-align: center;
`;

const Banner = styled.div<{ $bgphoto:string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding:60px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)) ,
  url( ${(props) => props.$bgphoto });
  background-size: cover;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 72px;
  color: white;
`;

const Overview = styled.p`
  width: 50%;
  font-size: 20px;
  color: white;
`;

const SliderTitle = styled.p`
  position: relative;
  top :0px;
  width: 200px;
  height: 120px;
  margin :0px 20px 20px;
  color: white;
  font-size: 20px;
  font-weight: bolder;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
  left: 10px;
  
`;

const Row = styled(motion.div)`
position: absolute;
display: grid;
width: 99% ;
grid-template-columns: repeat(6,1fr);
gap: 5px;
`;

const rowVariants={
  hidden:{
    x:window.outerWidth +5,
  },
  visible:{
    x:0,
  },
  exit:{
    x:-window.outerWidth -5,
  },

};

const Box = styled(motion.div)<{$bgphoto:string}>`
height: 200px;
font-size:66px;
background-color: white;
background-image:url(${(props) => props.$bgphoto}) ; 
background-size: cover;
background-position: center center;
cursor: pointer;
&:first-child{
  transform-origin: center left;
}
&:last-child{
  transform-origin: center right;
}
`;

const boxVariants={
  normal:{
    scale : 1,
  },
  hover: {
    scale : 1.2,
    y : -50,
    transition:{
      delay:0.2,
      duration:0.1,
      type:"tween"

    }
  }
};

const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  /* padding:10px; */
  background-color: ${theme.black.lighter};
  color: white;
  opacity:0;
  h4{
    text-align: center;
    font-size: 18px;
  }
`;

const infoVariants={
  hover:{
    opacity:1,
    transition:{
      delay:0.2,
      duration:0.1,
      type:"tween"

    }
  }
};

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position:absolute;
  width:40vw;
  height: 40vh;
  left:0;
  top:0;
  right:0;
  margin:0 auto;
`;
const offset = 6;

function Home() {
  
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{movieId : string}>("/movies/:movieId");
  const {scrollY} = useScroll();
  const { data , isLoading} = useQuery<IGetMoviesResult>({ queryKey: ["movies", "nowPlaying"], queryFn: getMovies });
  const [index,setIndex] =useState(0);
  const [leaving,setLeaving] = useState(false);
  const incraseIndex = () => {
    if(data){
      if(leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies/offset) - 1;
      setIndex((prev) => prev === maxIndex ? 0 : prev+1)
    }
  };
  const toggleLeaving = () =>setLeaving((prev)=> !prev);
  const onBoxClicked = (movieId:number) =>{
    history.push(`/movies/${movieId}`);
  };

  const onOverlayClick = () => history.push("/");

    return  (
        <Wrapper>{isLoading ? ( 
          <Loader>Loading...</Loader> 
        ) : (
          <>
          <Banner onClick={incraseIndex} 
                  $bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title }</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <SliderTitle>현재 상영중인 영화</SliderTitle>
          <Slider>
            <AnimatePresence initial={false}
                    onExitComplete={toggleLeaving}>
            <Row variants={rowVariants} 
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{type:"tween",duration:1}}
            key={index}
            >
            {data?.results
              .slice(1)  // 0:메인 페이지 , 1~18: 슬라이드 리스트 (6개씩의 frame 3 pages)
              .slice(offset * index, offset * index + offset)
              .map((movie)=>(
                <Box 
                  layoutId={movie.id + "" }
                  key={movie.id}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  onClick={() => onBoxClicked(movie.id)}
                  $bgphoto={makeImagePath(movie.backdrop_path, "w500")} >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
               </Box>
              ))}
            </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ?(
              <>
              <Overlay 
                onClick={onOverlayClick} 
                exit={{opacity:0}} 
                animate={{opacity:1}} 
                />
                <BigMovie
                style ={{ top: scrollY.get() + 300 }}
                layoutId={bigMovieMatch.params.movieId}
                /></>  ) :null }
          </AnimatePresence>
        </>
        ) }
        </Wrapper>
      );
    }
export default Home;