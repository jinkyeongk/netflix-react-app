//const API_KEY = import.meta.env.VITE_API_KEY ;
const AUTH_KEY = import.meta.env.VITE_AUTH_KEY ;
const BASE_PATH = import.meta.env.VITE_BASE_PATH;

export interface IContent {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string; 
  name?: string; 
  overview: string;
  release_date?: string;
  origin_country?: string[]; 
  original_language?:string;
}
export interface IGetContentsResult {
  page : number;
  results: IContent[];
  total_pages: number;
  total_results: number;
}
export interface IGetContentResult{
  dates:{
      maximum:string,
      minimum:string
  }
  page:number,
  results:IContent[];
  total_pages:number;
  total_results:number;
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:  `Bearer ${AUTH_KEY}`
    }
  };
  

  export function getContents(content:string,keyName:string){
    return fetch(`${BASE_PATH}/${content}/${keyName}?language=en-US&page=1`,options)
        .then((response) => response.json()
    );
}



export function searchEngine(keyword:string){
  return fetch(`${BASE_PATH}/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1` , options)
    .then(response => response.json()

  );
}
export function getDetails(content:string,id:string){
  return fetch(`${BASE_PATH}/${content}/${id}?language=en-US&page=1`,options)
      .then((response) => response.json()
  );
}