import { useLocation } from "react-router";
import { searchEngine } from '../api';
import { useQuery } from '@tanstack/react-query';
import { IGetContentsResult } from '../Atoms';

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data } = useQuery<IGetContentsResult>({ queryKey: [keyword], queryFn: () => searchEngine(keyword || "")});
  
  return null; 
}
export default Search;