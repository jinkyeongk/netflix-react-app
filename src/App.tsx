import {  Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from 'recoil';

function App() {
  const client = new QueryClient();
  
  return (

    <RecoilRoot>
    <QueryClientProvider client={client}>
    <Router  basename="/netflix-react-app">
      <Header/>
      <Switch>
        <Route path="/tv" >
          <Tv/>
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
