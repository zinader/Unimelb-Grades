import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import ScoreComponent from "./components/ScoreComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={MainComponent} />
        <Route path="/subjects/:name/:code" exact component={ScoreComponent} />
      </Router>
    </div>
  );
}

export default App;
