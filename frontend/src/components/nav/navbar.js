import React from "react";
import { Link } from "react-router-dom";
import { Toast, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import SearchBar from "../search/search_container";

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
        <div className="outer-links-container">
          <div className="logout">
            <Link to={"/track"} id="create-track-link">
              Create a track
            </Link>

            <div className="dropdown">
              <span id="logged-in-as">Logged in as:</span>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-offset="10,12"
              >
                {this.props.currentUser.handle}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link
                  to={`/users/${this.props.currentUser.id}`}
                  className="dropdown-item"
                >
                  My Tracks
                </Link>

                <a
                  className="dropdown-item"
                  id="logout-user"
                  href="#/"
                  onClick={this.logoutUser}
                >
                  <Link to="/">Logout</Link>
                </a>
              </div>
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
                    <h1 data-title="BLOX" id="text-fill" className="title">BLOX</h1>
                  </Link>
                </strong>
                <small>BEAT</small>
              </Toast.Header>
            </Toast>
          </div>
          <SearchBar />
          {this.getLinks()}
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
