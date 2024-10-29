import { atom } from 'recoil';

interface ISlider {
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

export const moviesState = atom<ISlider[]>({
    key: "movies",
    default: [
        {
            keyName: "now_playing",
            title: "Now Playing ",
        },{
            keyName: "top_rated",
            title: "Top Rated",
        },{
            keyName: "popular",
            title: "Current Popular",
        },{
            keyName: "upcoming",
            title: "Upcoming Movies",
        },
    ],
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