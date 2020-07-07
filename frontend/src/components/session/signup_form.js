import React from "react";
import { withRouter } from "react-router-dom";
import './form.scss';
import { Form, Button} from 'react-bootstrap';

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

    this.props.signup(user, this.props.history).then(this.props.history.push("/login"));
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

    let handleError;
    if (this.state.errors.handle === undefined) {
      handleError = null
    } else { handleError = <div className='errors'>{Object.values(this.state.errors.handle).join('')}</div> }

    let password2Error;
    if (this.state.errors.password2 === undefined) {
      password2Error = null
    } else { password2Error = <div className='errors'>{Object.values(this.state.errors.password2).join('')}</div> }

    return (
      <div className="form">
        <header>
          <h2>Signup to build Beats!</h2>
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
          
          <Form.Group controlId="formBasicHandle">
            <Form.Label>Handle</Form.Label>
            <Form.Control 
              type="text"
              value={this.state.handle}
              onChange={this.update("handle")} 
              placeholder="Enter handle"
            />
            {handleError}
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
            {passwordError}
          </Form.Group>

          <Form.Group controlId="reformBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")} 
              placeholder="Resubmit Password" 
            />
            {password2Error}
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>

        </Form>
      </div>
    );
  }
}

export default withRouter(SignupForm);



