import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import ScoreComponent from "./components/ScoreComponent";

function App() {
  console.log(
    "%c cool stuff!!\n",
    "font-weight: bold; font-size: 50px;color: blue; text-shadow: 3px 3px 0 rgb(10, 25, 47) , 6px 6px 0 rgb(23, 42, 69) , 8px 8px 0 rgb(10, 25, 47) , 10px 10px 0 rgb(23, 42, 69) , 12px 12px 0 rgb(2,135,206)"
  );

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
