import { atom } from 'recoil';

interface ISlider {
    content:string;
    keyName: string;
    title: string;
}
export interface IMovie{
    id:number;
    title:string;
    backdrop_path:string;
    poster_path:string;
    overview:string;
}
export const tvRecoil = atom<ISlider[]>({
    key: "tvShows",
    default: [
        {   
            content:"tv",
            keyName: "airing_today",
            title: "Airing Today",
        },{
            content:"tv",
            keyName: "top_rated",
            title: "Top Rated",
        },{
            content:"tv",
            keyName: "popular",
            title: "Currently Popular",
        },{
            content:"tv",
            keyName: "on_the_air",
            title: "On The Air",
        },
    ],
});
export const moviesRecoil = atom<ISlider[]>({
    key: "movies",
    default: [
        {   content:"movie",
            keyName: "now_playing",
            title: "Now Playing ",
        },{
            content:"movie",
            keyName: "top_rated",
            title: "Top Rated",
        },{
            content:"movie",
            keyName: "popular",
            title: "Currently Popular",
        },{
            content:"movie",
            keyName: "upcoming",
            title: "Upcoming Movies",
        },
    ],
});
interface IRoot {
    [key: string] : string;
}

export const rootRecoil = atom<IRoot>({
    key: "root",
    default: {
        movie: "/",
        tv: "/tv",
        search: "/search",
    },
});
export interface ITopRatedMovie{
    id:number;
    title:string;
    backdrop_path:string;
    poster_path:string;
    overview:string;
}

export interface IMovies {
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    id: number;
    release_date: string;
    vote_average: number;
}



export interface IGetContentsResult {
    page : number;
    results: [];
    total_pages: number;
    total_results: number;
}

export interface ISearched{
    id:number;
    title:string;
    backdrop_path:string;
    poster_path:string;
    overview:string;
    media_type: string;
    release_date: string;
    vote_average: number
    vote_count: number;
}