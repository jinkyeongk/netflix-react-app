import { useQuery } from '@tanstack/react-query';
import { getSimilarContents, IContent, IGetContentResult } from '../api';
import { makeImagePath } from '../utils';
import { Loader } from '../styles/CommonStyle';
import { Box, Info, SimilarContents, SimilarLists } from '../styles/SimilarListStyle';

interface IGetSimilarList {
    content:string;
    id:number;
};


function SimilarList ({id , content}:IGetSimilarList){


    const {data,isLoading} = useQuery<IGetContentResult> (
        { queryKey: [content, "similar",id], queryFn:
            () =>  getSimilarContents(content,String(id)),
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 '신선'하다고 간주
        gcTime: 1000 * 60 * 30,   // 30분 (이전의 cacheTime)
        refetchOnWindowFocus: false,
      });

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
return(
    <>
    {isLoading?(
        <Loader>
        <div>
            <div></div><div></div>
        </div>
        </Loader>
    ):(similarContents.length>0?
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
                key={data.id + content}
                whileHover="normal"
                initial="normal"
                transition={{type: "linear"}}
                //onClick={() => onBoxClicked(data.id )}
                $bgphoto={makeImagePath(data.poster_path, "w300")} >
                    <Info >
                        { <h4>{data.title ?data.title: data.name}</h4> }
                    </Info>
                </Box>
            ))}
            </SimilarContents>
            </SimilarLists>
        )
        :null)
    }
        
        
    </>
);
}

export default SimilarList;
