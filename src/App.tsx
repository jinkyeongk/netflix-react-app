import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();
  
  return (
    <QueryClientProvider client={client}>
    <Router>
      <Header/>
      <Switch>
        <Route path="/tv">
          <Tv/>
        </Route>
        <Route path="/search">
          <Search/>            
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
