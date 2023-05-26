import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header/Header';
import './CSS/Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    const { name, totalScore, gravatarEmail } = this.props;
    const previousRanking = localStorage.getItem('ranking');
    const ranking = { name, totalScore, gravatarEmail };
    if (!previousRanking) {
      const arrayRanking = [];
      arrayRanking.push(ranking);
      localStorage.setItem('ranking', JSON.stringify(arrayRanking));
    } else {
      const parsedpreviousRanking = JSON.parse(previousRanking);
      const arrayRanking = [...parsedpreviousRanking, ranking];
      const stringifiedRanking = JSON.stringify(arrayRanking);
      localStorage.setItem('ranking', stringifiedRanking);
    }
  }

  render() {
    const { assertions, totalScore, gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const three = 3;
    const verify = assertions >= three;
    return (
      <div className={ `Winner${verify}` }>

        <Header />
        <div className="mainFeedback">
          <div className="feedbackCard">
            <div className={ `areCubeHappy-${verify}` } />
            <div className={ `photo-${verify}` }>
              <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="You" />
            </div>
            <p
              data-testid="feedback-text"
              className={ `feedback-text${verify}` }
            >
              {assertions >= three ? 'Well Done!' : 'Could be better...'}
            </p>
            <p
              data-testid="feedback-total-question"
              className="totalAssertions"
            >
              {assertions}
            </p>
            <p
              data-testid="feedback-total-score"
              className="totalScore"
            >
              {totalScore}
            </p>
            <Link to="/">
              <button
                data-testid="btn-play-again"
                className="btnPlayFeedback"
              >
                Play Again
              </button>
            </Link>
            <button
              data-testid="btn-ranking"
              className="btnConfFeedback"
              onClick={ () => {
                const { history } = this.props;
                history.push('/ranking');
              } }
            >
              Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  totalScore: PropTypes.number.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  totalScore: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
