import { styled } from 'styled-components';
import { makeImagePath } from '../utils';
import { IoInformationCircleOutline } from "react-icons/io5";
import { motion,AnimatePresence } from "framer-motion";
import { IContent } from '../api';
import { useHistory } from 'react-router';
import { trendingRecoil } from '../atoms';

interface IBanner{
  Bannerdata:IContent;
  content:string;
  keyName:string;
}


const BannerArea = styled.div<{ $bgphoto:string}>`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding:60px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)) ,
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

const MoreInfoBtn = styled(motion.button)`
  display: block;
  font-size:18px;
  padding-bottom: 6px;
  padding-right: 10px;
  margin-top: 15px;
  color: rgba(255,255,255,0.9);
  background-color: rgba(255,255,255,0.2);
  border-radius: 5px;
  border-width: 0px;
  cursor: pointer;
`;
const moreInfoVariants={
    normal:{
      scale: 1,
        backgroundColor : 'rgba(255,255,255,0.2)',
      },
    hover:{
        backgroundColor : 'rgba(255,255,255,0.4)',
        transition:{
            duration:0.7,
            type:"tween"
      
          }
      },
      
};


function Banner({Bannerdata, content,keyName}:IBanner){
  const history = useHistory();
  const recoilKey = trendingRecoil.key;
  const BannerId = Bannerdata.id;
  const onBoxClicked = (BannerId:number) =>{
    if(keyName==="week"||keyName ==="day"){
      history.push(`/${recoilKey}/${content}/${keyName}/${BannerId}`);
    }else{
      history.push(`/${content}/${keyName}/${BannerId}`);

    }
};
    return(
        <BannerArea 
                  $bgphoto={makeImagePath(Bannerdata.backdrop_path || "")}>
            <Title>{Bannerdata.title?Bannerdata.title: Bannerdata.name} </Title>
            <Overview>{Bannerdata.overview}
            <AnimatePresence>
                <MoreInfoBtn 
                  onClick={() => onBoxClicked(BannerId)} 
                  layoutId={Bannerdata.id  + "_" + keyName} 
                  whileHover="hover"
                  transition={{type: "tween"}}
                  variants={moreInfoVariants} 
                  >
                    <IoInformationCircleOutline style={{fontSize:'26px' ,transform:"translateY(25%)"}}/> More Info
                </MoreInfoBtn>
            </AnimatePresence>
            </Overview>
          </BannerArea>
    );
}

export default Banner;