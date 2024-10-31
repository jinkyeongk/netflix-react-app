import { AnimatePresence } from 'framer-motion';
import { IContent, IGetContentResult, searchEngine } from '../api';
import { makeImagePath } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../styles/CommonStyle';
import { FaCaretRight } from 'react-icons/fa6';
import { Box, conInfoVariants, ContentsInfo, Row, SearchedTitle, SliderContainer } from '../styles/SearchedSliderStyle';


interface ISearchedData{
    content:string;
    keyword:string;
}
export const boxVariants2={
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


function SearchedSlider({content,keyword}:ISearchedData){
    const { data, isLoading } = useQuery<IGetContentResult>(
        { queryKey: [content, keyword], queryFn:
            () => searchEngine(content,keyword)}
    );
    let slideContents = data?.results as IContent[];
    const contentFilter = (view : IContent) => {

        if(view.backdrop_path == null || view.poster_path == null ) {
            return false;
        }
        return view;
    };
  
    if(!isLoading) {
        slideContents = slideContents?.filter(contentFilter) as IContent[];
    }
  
    return (<> 
        {isLoading ? (
        <Loader> Loading ... </Loader>
    ) : (<>
        <SliderContainer >
            <SearchedTitle><FaCaretRight /> Results For {content}</SearchedTitle>
                <AnimatePresence initial={false} >
                    <Row 
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{type:"tween",duration:1}}
                        key={ content}
                        >
                        {slideContents
                        .slice(0,18)
                        .map((data)=>(
                            <Box 
                            layoutId={data.id + "_" +content}
                            key={data.id + content}
                            variants={boxVariants2}
                            whileHover="hover"
                            initial="normal"
                            transition={{type: "tween"}}
                            //onClick={() => onBoxClicked(data.id )}
                            $bgphoto={makeImagePath(data.backdrop_path, "w500")} >
                                <ContentsInfo variants={conInfoVariants} >
                                    <h4>{data.title ?data.title: data.name}</h4>
                                </ContentsInfo>
                            </Box>
                        ))}
                        </Row>
                    </AnimatePresence>
            </SliderContainer>
        </>)}
    </>);
}

export default SearchedSlider;