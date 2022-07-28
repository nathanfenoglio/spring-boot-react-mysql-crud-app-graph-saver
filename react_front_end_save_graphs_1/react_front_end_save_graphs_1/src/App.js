import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import GraphDetails from './components/GraphDetails';
import CreateGraph from './components/CreateGraph';
import UpdateGraph from './components/UpdateGraph';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
          <div className='content'>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/create_graph">
                <CreateGraph />
              </Route>
              <Route path="/graphs/:id">
                <GraphDetails />
              </Route>
              <Route path="/update_graph/:id">
                <UpdateGraph />
              </Route>
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
