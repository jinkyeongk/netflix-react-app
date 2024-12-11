import { AnimatePresence, useScroll } from 'framer-motion';
import { IContent, IGetContentResult, searchEngine } from '../api';
import { makeImagePath } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Loader, NoContentsArea } from '../styles/CommonStyle';
import { FaCaretRight } from 'react-icons/fa6';
import { Box, boxVariants2, conInfoVariants, ContentsInfo, Row, SearchedTitle, SliderContainer } from '../styles/SearchedSliderStyle';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useHistory, useLocation } from 'react-router';
import SearchedCotentModal from './SearchedContentModal';


interface ISearchedData{
    content:string;
    keyword:string;
}


function SearchedSlider({content,keyword}:ISearchedData){
    const history = useHistory();
    const {scrollY} = useScroll();
    const { data, isLoading } = useQuery<IGetContentResult>(
        { queryKey: [content, keyword], queryFn:
            () => searchEngine(content,keyword)}
    );
    let slideContents = data?.results as IContent[];
    const contentFilter = (view : IContent) => {

        if(view.backdrop_path == null && view.profile_path == null ) {
            return false;
        }
        return view;
    };
    
   
    // useRouteMatch 대신 useLocation을 사용하여 쿼리 파라미터 처리
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const contentId = searchParams.get('contentId');
    const onBoxClicked = (contentId: number) => {
        history.replace(`/search?keyword=${keyword}&contentId=${contentId}`);
    };
    
    const clickedContent = 
    contentId && 
    data?.results.find((keyContent) => keyContent.id === +contentId) as IContent;

    if(!isLoading) {
        slideContents = slideContents?.filter(contentFilter) as IContent[];
    }
  
    return (<> 
        {isLoading ? (
        <Loader> <AiOutlineLoading3Quarters /> </Loader>
    ) : (<>
        <SliderContainer >
            <SearchedTitle><FaCaretRight /> Results For {content}</SearchedTitle>
                <AnimatePresence initial={false} >
                    { slideContents.length == 0 ? 
                    <NoContentsArea> There is no Contents .</NoContentsArea> :
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
                            onClick={() => onBoxClicked(data.id )}                        
                            style={{ cursor: data.profile_path ? 'default' : 'pointer' }}
                            $bgphoto={makeImagePath((data.backdrop_path ?? data.profile_path ?? "").toString(), "w500")} >
                                <ContentsInfo variants={conInfoVariants} >
                                    <h4>{data.title ?data.title: data.name}</h4>
                                </ContentsInfo>
                            </Box>
                        ))}
                        </Row>
                        }
                    </AnimatePresence>
            </SliderContainer>
        </>)}
        {clickedContent ?  <SearchedCotentModal  clickedContent={clickedContent as IContent} content={content}  keyName ={keyword} scrollY={scrollY.get()} />  : null}
        {/* {bigContentMatch ? (content == 'tv' ? (
            <TvShowModal clickedContent={clickedContent as IContent} content={keyword}  keyName ={content} scrollY={scrollY.get()} />
        ) :(
            <MovieModal  clickedContent={clickedContent as IContent} content={keyword}  keyName ={content} scrollY={scrollY.get()} />
        ) )
        :null } */}
        
    </>);
}

export default SearchedSlider;