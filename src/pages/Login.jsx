import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsGear } from 'react-icons/bs';
import { connect } from 'react-redux';
import validator from 'validator';
import { saveEmail, updateScore } from '../redux/actions/actions';
import './CSS/Login.css';

class Login extends Component {
  state = {
    email: '',
    user: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(updateScore(0, 0));
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const link = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(link);
    const data = await response.json();
    localStorage.setItem('token', data.token);
    dispatch(saveEmail(this.state));
    history.push('/game');
  };

  render() {
    const { email, user } = this.state;
    const MinLengthUser = 3;
    const disableBtn = validator.isEmail(email) && user.length >= MinLengthUser;
    const { history } = this.props;
    return (
      <div className="bodyLogin">
        <div className="formLogin">
          <div className="logo" />
          <div className="formLogin2">
            Login
            <input
              type="email"
              name="email"
              id="email"
              className="input inputEmail"
              placeholder="Email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
            <input
              type="text"
              name="user"
              id="user"
              className="input inputUserName"
              placeholder="Name"
              value={ user }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              className="btnPlay"
              data-testid="btn-play"
              disabled={ !disableBtn }
              onClick={ this.handleClick }
            >
              Play
            </button>
            <button
              type="button"
              className="btnConf"
              data-testid="btn-settings"
              onClick={ () => history.push('/settings') }
            >
              <BsGear color="white" />
              configurações
            </button>
          </div>
        </div>
        <div className="background">
          <span>?</span>
          <span>?</span>
          <span>?</span>
          <span>?</span>
          <span>?</span>
          <span>?</span>
          <span>?</span>
          <span>?</span>
          <span>?</span>
          <span>?</span>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
