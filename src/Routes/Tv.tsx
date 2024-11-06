
import {  Wrapper } from '../styles/CommonStyle';
import Slider from '../Components/Slider';
import { useRecoilValue } from 'recoil';
import { tvRecoil } from '../atoms';



function Tv(){
    const getTvShows = useRecoilValue(tvRecoil);

    return (
        <Wrapper>
          <>
            {getTvShows.map((tv,index) => (
              <Slider key={tv.keyName} keyContent={tv.content} keyName={tv.keyName} slideTitle={tv.title} hasBanner={index == 0 ? true : false} ></Slider>
            ))}
          </>
       </Wrapper>
      );
}

export default Tv;