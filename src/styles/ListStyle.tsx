import { styled } from 'styled-components';

export const ListContainer = styled.div`
    margin: 20px 0;
    @media only screen and (min-width: 1200px) {
        margin: 30px 0;
    }
`;
export const DetailTitle = styled.h3`
    font-size: 18px;
    color: ${props => props.theme.title};
    margin: 10px 0;
`;
export const LastEpiTitle = styled(DetailTitle)`
    display: flex;
    justify-content: space-between;
`;
export const ListRow = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media only screen and (min-width: 1200px) {
        grid-template-columns: repeat(6, 1fr);
    }
`;
export const ListBox = styled.div`
    font-size: 12px;
    margin-bottom: 10px;
`;
export const FilmoImage = styled.div`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${props => props.theme.black.lighter};
    color: #fff;
    display: flex;
    aspect-ratio: 99 / 140;
    font-size: 12px;
    align-items: center;
    justify-content: center;
`;
export const ListName = styled.div`
    font-size: 14px;
    color: ${props=> props.theme.white.darker};
    margin: 5px 0;
`;
