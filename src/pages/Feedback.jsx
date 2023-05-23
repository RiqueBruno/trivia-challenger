import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';

class Feedback extends Component {
  render() {
    const { assertions, totalScore } = this.props;
    const three = 3;
    return (
      <div>

        <Header />
        <p
          data-testid="feedback-text"
        >
          {assertions >= three ? 'Could be better...' : 'Well Done!'}
        </p>
        <p
          data-testid="feedback-total-question"
        >
          {assertions}
        </p>
        <p
          data-testid="feedback-total-score"
        >
          {totalScore}
        </p>
        <Link to="/">
          <button
            data-testid="btn-play-again"

          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"

          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  totalScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
