import React from "react";
import { Link } from "react-router-dom";
import { Toast, Button } from "react-bootstrap";
import { Route, Redirect, withRouter } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.handleDemoUser = this.handleDemoUser.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  handleDemoUser(e) {
    e.preventDefault();
    this.props
      .login({
        email: "demouser@gmail.com",
        password: "password",
      })
      .then(() => window.location.reload());
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="logout">
          {/* <Link to={"/blockbeats"}>All Block Beats</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/new_tweet"}>Write a Tweet</Link> */}
          <Link to={"/track"} id="create-track-link">
            Create a track
          </Link>
          <div class="dropdown">
            <span id="logged-in-as">Logged in as:</span>
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.props.currentUser.handle}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">
                My Tracks
              </a>
              <a class="dropdown-item" href="#">
                Placeholder
              </a>
              <a
                class="dropdown-item"
                id="logout-user"
                href="#"
                onClick={this.logoutUser}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav-btn">         
            <Link to={"/signup"}>Signup</Link>
            <Link to={"/login"}>Login</Link> 

          <Button
            variant="success"
            type="button"
            className="demouser-button"
            onClick={this.handleDemoUser}
          >
            DEMO LOGIN
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div id="navbar">
        <div className="navbar-inner">
          <div>
            <Toast>
              <Toast.Header>
                <strong>
                  <Link to="/">
                    <h1 className="title">BLOX</h1>
                  </Link>
                </strong>
                <small>BEAT</small>
              </Toast.Header>
            </Toast>
          </div>
          {this.getLinks()}
        </div>
      </div>
    );
  }
}

{/* <Toast>
  <Toast.Header>
    <strong>
      <Link to="/">
        <h1 className="title">BLOX</h1>
      </Link>
    </strong>
    <small>BEAT</small>
  </Toast.Header>
</Toast>; */}

export default withRouter(NavBar);
