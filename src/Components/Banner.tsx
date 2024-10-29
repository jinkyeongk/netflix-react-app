import { styled } from 'styled-components';
import { makeImagePath } from '../utils';
import { IoInformationCircleOutline } from "react-icons/io5";
import { motion,AnimatePresence } from "framer-motion";
import { IContent } from '../api';

interface IBanner{
  Bannerdata:IContent;
}


const BannerArea = styled.div<{ $bgphoto:string}>`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding:60px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.8)) ,
  url( ${(props) => props.$bgphoto });
  background-size: cover;
`;

const Title = styled.h2`
  margin-top: 100px;
  margin-bottom: 20px;
  font-size: 68px;
  color: rgba(255,255,255,0.8);
`;

const Overview = styled.div`
  position: relative;
  width: 50%;
  font-size: 20px;
  color: rgba(255,255,255,0.7);
`;

const MoreInfoBtn = styled(motion.div)`
  position: relative;
  margin-top: 20px;
  width : 130px ;
  height: 40px;
  color: white;
  font-size:18px;
  top: 0;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.9);
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


function Banner({Bannerdata}:IBanner){
    return(
        <BannerArea 
                  $bgphoto={makeImagePath(Bannerdata.backdrop_path || "")}>
            <Title>{Bannerdata.title} </Title>
            <Overview>{Bannerdata.overview}
            <AnimatePresence>
                <MoreInfoBtn variants={moreInfoVariants} 
                  whileHover="hover">
                    <IoInformationCircleOutline style={{fontSize:'26px' ,transform:"translateY(25%)"}}/> More Info
                </MoreInfoBtn>
            </AnimatePresence>
            </Overview>
          </BannerArea>
    );
}

export default Banner;