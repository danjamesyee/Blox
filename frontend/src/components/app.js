import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

//For React-Bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.scss'; 


import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import Tracks from "./tracks/tracks_container";
import MainPage from "./main/main_page_container";

const App = () => (
  <div className="g-layout">
    <NavBarContainer />

    <Switch>
      <Route exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/track" component={Tracks} />
    </Switch>

    <footer>Copyright &copy; 2020 Daniel Group</footer>
  </div>
);

export default App;
