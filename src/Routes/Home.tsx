
import { useQuery } from '@tanstack/react-query';
import { getMovies, IGetMoviesResult } from "../api";
import { styled } from 'styled-components';
import {motion,AnimatePresence} from"framer-motion";
import { makeImagePath } from '../utils';
import { useState } from 'react';


const Wrapper = styled.div`
  background-color: black;
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
  font-size: 68px;
  color: white;
`;
const Overview = styled.p`
  width: 50%;
  font-size: 30px;
  color: white;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;`;

const Row = styled(motion.div)`
position: absolute;
display: grid;
width: 100%;
grid-template-columns: repeat(6,1fr);
gap: 10px;
margin-bottom: 5px;

`;
const Box = styled(motion.div)`
height: 200px;
color:red;
font-size:24px;
background-color: white;
`;

const rowVariants={
  hidden:{
    x:window.outerWidth +10,
  },
  visible:{
    x:0,
  },
  exit:{
    x:-window.outerWidth -10,
  },
};

function Home() {
  

  const { data , isLoading} = useQuery<IGetMoviesResult>({ queryKey: ["movies", "nowPlaying"], queryFn: getMovies });
  const [index,setIndex] =useState(0);
  const incraseIndex = () => setIndex((prev) => prev+1);
  
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
          <Slider>
            <AnimatePresence>
            <Row variants={rowVariants} 
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{type:"tween",duration:1}}
            key={index}
            >
              {[1,2,3,4,5,6].map((i)=>(
                <Box key={i}>{i}</Box>
              ))}
            </Row>
            </AnimatePresence>
          </Slider>
        </>
        ) }
        </Wrapper>
      );
    }
export default Home;