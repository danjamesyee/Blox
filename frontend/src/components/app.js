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
import TracksShowContainer from "./tracks/tracks_show_container";
import UserProfile from "./user/user_profile_container";
import TracksEdit from "./tracks/tracks_edit_container";
import GlobalFooter from "./footer/footer";

const App = () => (
  <div className="g-layout">
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/track" component={Tracks} />
      <Route exact path="/tracks/:trackId" component={TracksShowContainer} />
      <Route exact path="/users/:userId" component={UserProfile} />
      <Route exact path="/tracks/:trackId/edit" component={TracksEdit} />
    </Switch>
    <footer id="global-footer">
      <GlobalFooter />
    </footer>
  </div>
);

export default App;
