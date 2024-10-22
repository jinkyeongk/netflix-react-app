
import { atom } from "recoil";

const AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: AUTH_KEY
    }
  };
  



export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?language=ko-KR&page=1&region=KR`, options)
        .then((response) => response.json()
    );
}
export function searchEngine(keyword:string){
  return fetch(`${BASE_PATH}/search/keyword?query=${keyword}&page=1` , options)
    .then(response => response.json()

  );
}