import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';
import '../styles/login.scss';

const INITIAL_STATE = {
  email: '',
  password: '',
  isInvalid: true,
};

class Login extends React.Component {
  state = INITIAL_STATE;

  validateInputs = () => {
    const { email, password } = this.state;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailValid = emailRegex.test(email);

    const MAX_LENGTH = 6;
    const passwordValid = password.length >= MAX_LENGTH;

    const valid = emailValid && passwordValid;

    this.setState({
      isInvalid: !valid,
    });
  };

  onHandleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateInputs);
  };

  onSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isInvalid } = this.state;

    return (
      <div className="backContainerLogin">
        <form className="container formLogin">
          <p>Login</p>
          <label htmlFor="email-input">
            Email
            <br />
            <input
              type="text"
              id="email-input"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.onHandleChange }
              placeholder="mail@exemple.com"
            />
          </label>
          <label htmlFor="password-input">
            Password
            <br />
            <input
              type="password"
              id="password-input"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.onHandleChange }
              placeholder="**********"
            />
          </label>
          <button
            type="button"
            onClick={ this.onSubmit }
            disabled={ isInvalid }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default connect()(Login);
