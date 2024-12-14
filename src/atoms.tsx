import { atom } from 'recoil';

interface ISlider {
    content:string;
    keyName: string;
    title: string;
}
interface ISliderTrending {
    content:string;
    keyName:string;
    title: string;
}
export interface IMovie{
    id:number;
    title:string;
    backdrop_path:string;
    poster_path:string;
    overview:string;
}
export const trendingRecoil = atom<ISliderTrending[]>({
    key: "trending",
    default: [
        {
            content:"movie",
            keyName: "week",
            title: "Weekly Movie Trending",
        },
        {
            content:"tv",
            keyName: "week",
            title: "Weekly Tv Trending",
        },
        {
            content:"movie",
            keyName: "day",
            title: "Daily Movie Trending",
        },
        {
            content:"tv",
            keyName: "day",
            title: "Daily Movie Trending",
        },
    ],
});
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
export const searchRecoil = atom({
    key: "search",
    default: [
        {   
            content:"movie",
        },{
            content:"tv",
        },
        {
            content:"person",
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
        trending: "/trending",
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
    name?:string;
    backdrop_path:string;
    poster_path:string;
    overview:string;
    media_type: string;
    release_date: string;
    vote_average: number
    vote_count: number;
}
interface IGenres {
    id: number;
    name: string;
}
export interface IGetDetails{
    id: number;
    name: string;
    original_name: string;
    backdrop_path : string;
    poster_path: string;
    genres: IGenres[];
    overview: string;
    first_air_date: string;
    last_air_date: string;
    number_of_episodes: number;
    number_of_seasons: number;
    adult: boolean;
    vote_average: number;
}
export interface IGetMovieDetails{
    id: number;
    name: string;
    backdrop_path : string;
    poster_path: string;
    genres: IGenres[];
    overview: string;
    runtime: string;
    adult: boolean;
    vote_average: number;
}
interface ICredit {
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string;
    character: string;
    order: number;
}
export interface ICredits {
    id: number;
    cast: ICredit[];
}
