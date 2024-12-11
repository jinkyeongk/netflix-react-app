import {  Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Trending from './Routes/Trending';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from 'recoil';

function App() {
  const client = new QueryClient();
  // const ScrollToTop = () => {
  //   const location = useLocation();  // 현재 URL 위치를 추적하는 훅
  
  //   useEffect(() => {
  //     window.scrollTo(0, 0);  // 페이지 이동 시 스크롤을 맨 위로 이동
  //   }, [location]);  // location이 변경될 때마다 실행
  
  //   return null;
  // };
  
  return (

    <RecoilRoot>
    <QueryClientProvider client={client}>
    <Router  basename="/netflix-react-app" >
      <Header/>
      <Switch>
        <Route path="/tv" >
          <Tv/>
        </Route>
        <Route path="/trending" >
          <Trending/>
        </Route>
        <Route path="/search">
          <Search/>
        </Route>
        <Route path={["/", "/movie/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
    </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
