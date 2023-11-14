import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';

class Timer extends Component {
  state = {
    timeCounter: 30,
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    this.handlerCHangeToResetTimer(prevProps);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handlerCHangeToResetTimer = (prevProps) => {
    const { resetTimer, resetTimerFunc } = this.props;
    if (prevProps.resetTimer !== resetTimer && resetTimer) {
      this.setState({ timeCounter: 30 });
      resetTimerFunc();
      this.resetAnimation();
    }
  };

  // startTimer = () => {
  //   const time = 1000;
  //   this.timer = setInterval(() => {
  //     this.setState((prevState) => ({ timeCounter: prevState.timeCounter - 1 }));
  //   }, time);
  // };

  startTimer = () => {
    const { timeCounter } = this.state;
    const { resetTimerFunc } = this.props;
    const time = 1000;
    this.timer = setInterval(() => {
      this.setState((prevState) => ({ timeCounter: prevState.timeCounter - 1 }), () => {
        if (timeCounter === 0) {
          clearInterval(this.timer);
          resetTimerFunc();
          this.setState({ isAnimating: true });
        }
      });
    }, time);
  };

  resetAnimation = () => {
    const num = 1;
    const countdownElement = document.querySelector('.countdown');
    const svgElement = countdownElement.querySelector('svg');
    countdownElement.removeChild(svgElement);
    setTimeout(() => {
      countdownElement.appendChild(svgElement);
    }, num);
  };

  render() {
    const { timeCounter, isAnimating } = this.state;
    const { styleBtn } = this.props;
    return (
      <div className="timer-container">
        <div>
          <div className="timeOver">{timeCounter <= 0 ? ('☹') : (null)}</div>
          <div className="divRef">
            {timeCounter > 0 ? (
              <div className="timeReal">
                {timeCounter}
              </div>
            ) : (styleBtn()) }
          </div>
          <div className={ `countdown ${isAnimating ? 'countdown-an' : 'countdown'}` }>
            <svg>
              <circle r="40" cx="50" cy="50" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  styleBtn: PropTypes.func.isRequired,
  resetTimer: PropTypes.bool.isRequired,
  resetTimerFunc: PropTypes.func.isRequired,
};

export default Timer;
