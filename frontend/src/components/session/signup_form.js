import React from "react";
import { withRouter } from "react-router-dom";
import './form.scss';
import { Form,  Badge, Button, Alert } from 'react-bootstrap';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      handle: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.signup(user, this.props.history);
  }

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
      <div className="signup-form">
        <h2><Badge variant="success">Sign Up</Badge></h2>

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
          
          <Form.Group controlId="formBasicHandle">
            <Form.Label>Handle</Form.Label>
            <Form.Control 
              type="text"
              value={this.state.handle}
              onChange={this.update("handle")} 
              placeholder="Enter handle"
            />
            <Form.Text className="text-muted">
              Make a name for yourself.
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

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")} 
              placeholder="Resubmit Password" 
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

export default withRouter(SignupForm);


{/* <div className='login-form'>
        <h3><Badge variant="danger">Login</Badge></h3>
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
      </div> */}
