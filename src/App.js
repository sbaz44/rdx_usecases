// import logo from './logo.svg';

import Page1 from "./pages/Page1";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Add from "./Add";
import Add2 from "./Add2";
import AddCamera from "./AddCamera";
import UpdateCamera from "./UpdateCamera";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={AddCamera} exact />
          <Route path="/update/:idee" component={UpdateCamera} exact strict />
        </Switch>
      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <Add /> */}
      {/* <Add2 /> */}
      {/* <Page1 /> */}
      {/* <AddCamera /> */}
    </div>
  );
}

export default App;
