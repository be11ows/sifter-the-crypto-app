import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import List from './components/List';
import CuratedList from './components/CuratedList';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import About from './components/About';

const NoMatchPage = () => {
  return (
    <h3>404 - Not Found</h3>
  );
};

function App() {

  return (
    <div>
      <Router>

        <Navbar />

        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/list"><List /></Route>
          <Route path="/curatedList"><CuratedList /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/logout"><Logout /></Route>
          <Route path="/about"><About /></Route>  
          <Route component={NoMatchPage} />
        </Switch>
        
      </Router>
    </div>
  )
}

export default App;
