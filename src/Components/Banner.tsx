import { styled } from 'styled-components';
import { makeImagePath } from '../utils';
import { IoInformationCircleOutline } from "react-icons/io5";
import { motion,AnimatePresence } from "framer-motion";
import { IContent } from '../api';

interface IBanner{
  data:IContent;
}


const BannerArea = styled.div<{ $bgphoto:string}>`
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

const MoreInfoBtn = styled(motion.div)`
  width : 130px ;
  height: 40px;
  color: white;
  font-size:18px;
  text-align: center;
  align-items: center;
  justify-content: center;
border-color: white;
  background-color: rgba(0,0,0,0.5);
  border-radius: 15px;
  cursor:pointer;  
`;
const moreInfoVariants={
    normal:{
        backgroundColor : 'rgba(0,0,0,0.5)',
      },
    hover:{
        backgroundColor : 'rgba(255,255,255,0.2)',
        transition:{
            duration:0.7,
            type:"tween"
      
          }
      }
};


function Banner({data}:IBanner){
    return(
        <BannerArea 
                  $bgphoto={makeImagePath(data.backdrop_path || "")}>
            <Title>{data.title} </Title>
            <Overview>{data.overview}</Overview>
            <AnimatePresence>
                <MoreInfoBtn variants={moreInfoVariants} 
                  whileHover="hover">
                    <IoInformationCircleOutline style={{fontSize:'26px' ,transform:"translateY(25%)"}}/> More Info
                </MoreInfoBtn>
            </AnimatePresence>
          </BannerArea>
    );
}

export default Banner;