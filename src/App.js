// import logo from './logo.svg';

import Page1 from "./pages/Page1";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Add from "./Add";
import Add2 from "./Add2";
import AddCamera from "./AddCamera";
import AddCamera2 from "./AddCamera2";
import UpdateCamera from "./UpdateCamera";
import EditService from "./EditService";
import Annotation from "./pages/Annotation";
import Demo from "./Demo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={AddCamera} exact />
          <Route path="/demo/:idee" component={Demo} exact strict />
          <Route path="/update/:idee" component={UpdateCamera} exact strict />
          <Route path="/edit/:service" component={EditService} exact strict />
          <Route path="/annotation" component={Annotation} exact strict />
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
