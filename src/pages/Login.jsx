import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    user: '',
  };

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  render() {
    const { email, user } = this.state;
    const regexEmail = /^[a-z0-9]+@[a-z0-9]+\.+[a-z0-9]{3}$/;
    const MinLengthUser = 3;
    const disableBtn = regexEmail.test(email) && user.length >= MinLengthUser;
    const { history } = this.props;
    return (
      <div>
        Login
        <input
          type="email"
          name="email"
          id="email"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="user"
          id="user"
          value={ user }
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !disableBtn }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect()(Login);
