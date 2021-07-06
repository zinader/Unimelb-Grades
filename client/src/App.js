import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={MainComponent} />
      </Router>
    </div>
  );
}

export default App;
