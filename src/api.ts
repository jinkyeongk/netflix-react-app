const API_KEY = import.meta.env.VITE_API_KEY ;
const AUTH_KEY = import.meta.env.VITE_AUTH_KEY ;
const BASE_PATH = import.meta.env.VITE_BASE_PATH;

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:  `Bearer ${AUTH_KEY}`
    }
  };
  

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?language=en-US&page=1`,options)
        .then((response) => response.json()
    );
    
}
export function searchEngine(keyword:string){
  return fetch(`${BASE_PATH}/search/keyword?query=${keyword}&page=1` , options)
    .then(response => response.json()

  );
}
export function getTopRatedMovies(){
  return fetch(`${BASE_PATH}/movie/top_rated?language=en-US&page=1&region=KR` , options)
    .then(response => response.json()

  );
}