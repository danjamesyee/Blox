import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import './navbar.scss';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          {/* <Link to={"/blockbeats"}>All Block Beats</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/new_tweet"}>Write a Tweet</Link> */}
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className='nav-btn'>
          <Button to={"/signup"}>Signup</Button>
          <Button to={"/login"}>Login</Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>User</h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
