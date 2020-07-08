import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { login } from "../../actions/session_actions"

import NavBar from "./navbar";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user
});

export default connect(mapStateToProps, { logout, login })(NavBar);
