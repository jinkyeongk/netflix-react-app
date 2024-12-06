import { useQuery } from '@tanstack/react-query';
import { getCredits } from '../api';
import { ICredits } from '../atoms';
import { Loader } from '../styles/CommonStyle';
import { makeImagePath } from '../utils';
import { DetailTitle, FilmoImage, ListBox, ListContainer, ListName, ListRow } from '../styles/ListStyle';

interface IListCredits {
    content: string;
    id: number;
}
function CreditList({ id, content }:IListCredits) {


    const { data, isLoading } = useQuery<ICredits>({
    queryKey: ["credits", id],
    queryFn: () => getCredits(id, content),
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 '신선'하다고 간주
    gcTime: 1000 * 60 * 30,   // 30분 (이전의 cacheTime)
    refetchOnWindowFocus: false,
  });

    return <>
        {isLoading? (
            <Loader>
                <div>
                    <div></div><div></div>
                </div>
            </Loader>
        ) : (
            <ListContainer>
                {data?.cast.length as number > 0 && <DetailTitle>Cast Members</DetailTitle>}
                <ListRow>
                    {data?.cast
                        .slice(0, 6 * 2)
                        .map((actor) => (
                        <ListBox key={actor.id}>
                            {actor.profile_path ? (
                                <FilmoImage style={{
                                    backgroundImage: `url(${makeImagePath(actor.profile_path, "w300" )} )` 
                                }} />):(
                                <FilmoImage> No Image </FilmoImage>
                            )}
                            <ListName>{actor.name}</ListName>
                            {actor.character && <div>({actor.character})</div>}
                        </ListBox>
                    ))}
                </ListRow>
            </ListContainer>
        )}
    </>;
}

export default CreditList;