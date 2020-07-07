import React from "react";
import { Link, Route, Redirect, withRouter } from "react-router-dom";
import './form.scss';
import { Form, Button } from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
   
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user)
    // .then(this.props.history.push("/"));
  }


  render() {
    

    let emailError;
    if (this.state.errors.email === undefined) {
      emailError = null
    } else { emailError = <div className='errors'>{Object.values(this.state.errors.email).join('')}</div> }

    let passwordError;
    if (this.state.errors.password === undefined) {
      passwordError = null
    } else { passwordError = <div className='errors'>{Object.values(this.state.errors.password).join('')}</div> }

    return (
      <div className='form'>
        
        <header>
          <h2>Login and lets Block'em Beats!</h2>
        </header>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email"
              value={this.state.email}
              onChange={this.update("email")} 
              placeholder="Enter email"
            />
            {emailError}
            <Form.Text className="text-muted">
              We'll never share your email with anybody.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password"
              value={this.state.password}
              onChange={this.update("password")} 
              placeholder="Password" 
            />
            {passwordError}
          </Form.Group>
        
          <Button variant="success" type="submit">Submit</Button>
            

        </Form>
      </div>
    );
  }
}

export default withRouter(LoginForm);


