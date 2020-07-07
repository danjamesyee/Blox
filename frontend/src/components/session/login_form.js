import React from "react";
import { withRouter } from "react-router-dom";
import './form.scss';
import { Form,  Badge, Button, Alert } from 'react-bootstrap';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/placeholder");
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

    this.props.login(user);
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {

    let errorsRender;
    if ( this.renderErrors() ) {
      errorsRender = 
        <Alert variant='danger'>
          {this.renderErrors()}
        </Alert>
    } else { errorsRender = <div></div>}

    return (
      <div className='login-form'>
        <h2><Badge variant="success">Login</Badge></h2>
        <Form onSubmit={this.handleSubmit}>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email"
              value={this.state.email}
              onChange={this.update("email")} 
              placeholder="Enter email"
            />
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
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>

          {errorsRender}

        </Form>
      </div>
    );
  }
}

export default withRouter(LoginForm);

{/* <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> */}
