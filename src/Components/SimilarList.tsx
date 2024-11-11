import { useQuery } from '@tanstack/react-query';
import { getSimilarContents, IContent, IGetContentResult } from '../api';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { makeImagePath } from '../utils';

interface IGetSimilarList {
    content:string;
    id:number;

};

export const SimilarLists = styled.div`
     position: relative;
    top: 0;
    justify-content: space-between;
`;
export const Box = styled(motion.div)<{$bgphoto:string}>`
  position: relative;
  width:100%;
  height: 150px;
  font-size:30px;
  background-color: transparent;
  background-image:url(${(props) => props.$bgphoto}) ; 
  background-size: cover;
  background-position: center center;

  
`;

export const SimilarContents = styled(motion.div)`
    margin-top: 5px;
    display: grid;
    gap: 5px;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
`;


function SimilarList ({content , id}:IGetSimilarList){
    const {data,isLoading} = useQuery<IGetContentResult> (
        { queryKey: [content, "videos"], queryFn:
        () => getSimilarContents(content,String(id))}
    );

    let similarContents= data?.results as IContent[];
  
    const contentFilter = (view : IContent) => {

        if(view.backdrop_path == null || view.poster_path == null ) {
            return false;
        }
        return view;
    };
    
    if(!isLoading) {
        similarContents = similarContents?.filter(contentFilter) as IContent[];
    }
  console.log(similarContents);
return(
    <>
    {Number(data?.results.length) > 0 && !isLoading ?
        (<SimilarLists> 〉 Similar Contents Recommended
        <SimilarContents 
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{type:"tween",duration:1}}
            key={content}
            >
            {similarContents
            .slice(0,6)
            .map((data)=>(
                <Box 
                layoutId={data.id + "_" +content}
                key={data.id + content}
                whileHover="hover"
                initial="normal"
                transition={{type: "tween"}}
                //onClick={() => onBoxClicked(data.id )}
                $bgphoto={makeImagePath(data.backdrop_path, "w500")} >
                    <span >
                        {/* <h4>{data.title ?data.title: data.name}</h4> */}
                    </span>
                </Box>
            ))}
            </SimilarContents>
            </SimilarLists>
        )
        :null
    }
        
        
    </>
);
}

export default SimilarList;
