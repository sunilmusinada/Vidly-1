import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./Controllers/Movies";
import NavBar from "./Controllers/Common/navBar";
import Rentals from "./Controllers/Rentals";
import Customers from "./Controllers/Customers";
import NotFound from "./Controllers/notFound";
import "./App.css";
import MovieForm from "./Controllers/movieForm";
import LoginForm from "./Controllers/Common/Login";
import Register from "./Controllers/Register";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main role="main" className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={Register} />
            <Route path="/Movies/:id" component={MovieForm} />
            <Route path="/Rentals" component={Rentals} />
            <Route path="/Customers" component={Customers} />
            <Route path="/Movies" component={Movies} />

            <Route path="/not-found" component={NotFound} />
            <Redirect path="/" exact to="/Movies" />
            <Redirect path="/Vidly-1" exact to="/Movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
