import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import './CSS/Ranking.css';

export default class Ranking extends Component {
  returnHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const storage = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking-page">
        <h2 data-testid="ranking-title" className="ranking-title">Ranking</h2>

        <button
          className="btn-go-home"
          data-testid="btn-go-home"
          onClick={ this.returnHome }
        >
          Home
        </button>
        <div className="main-Ranking-Box">
          <div className="rank3" />
          <div className="rank2" />
          <div className="rank1" />
          <div className="ranking-box">
            { storage.sort((a, b) => b.totalScore - a.totalScore).map((player, index) => (
              <div className="ranking-player" key={ index }>
                <div className="ranking-Player-Infos">
                  <span>{ index + 1 }</span>
                  <img src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}` } alt="Player" width="80px" />
                  <p data-testid={ `player-name-${index}` }>
                    { player.name }
                  </p>
                </div>

                <div className="ranking-Player-points">
                  <p data-testid={ `player-score-${index}` }>
                    { `${player.totalScore} pontos`}
                  </p>
                </div>
              </div>
            )) }
          </div>
        </div>
        <div className="backgrounds">
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

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
