import './App.css';
import NavBar from "./Components/NavBar";
import React, { Component } from 'react'
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route

} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/"><News key="general" pageSize={15} country="in" category="general" /></Route>
            <Route exact path="/business"><News key="business" pageSize={15} country="in" category="business" /></Route>
            <Route exact path="/entertainment"><News key="entertainment" pageSize={15} country="in" category="entertainment" /></Route>
            <Route exact path="/general"><News key="general" pageSize={15} country="in" category="general" /></Route>
            <Route exact path="/health"><News key="health" pageSize={15} country="in" category="health" /></Route>
            <Route exact path="/sciences"><News key="sciences" pageSize={15} country="in" category="sciences" /></Route>
            <Route exact path="/sports"><News key="sports" pageSize={15} country="in" category="sports" /></Route>
            <Route exact path="/technology"><News key="technology" pageSize={15} country="in" category="technology" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
