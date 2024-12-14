
import {  Wrapper } from '../styles/CommonStyle';
import { useRecoilValue } from 'recoil';
import { trendingRecoil } from '../atoms';
import TrendingContentSlider from '../Components/TrendingContentSlider';



function Trending(){
    const getTrendings= useRecoilValue(trendingRecoil);
    return (
        <Wrapper>
          <>
            {getTrendings.map((trendings,index) => (
              <TrendingContentSlider key={trendings.content+"+"+index} content={trendings.content} keyName={trendings.keyName} slideTitle={trendings.title} hasBanner={index == 0 ? true : false} ></TrendingContentSlider>
            ))}
          </>
       </Wrapper>
      );
}

export default Trending;