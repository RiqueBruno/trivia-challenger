import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import './CSS/Game.css';
import Timer from '../components/Timer';
import { updateScore } from '../redux/actions/actions';

class Game extends Component {
  state = {
    questions: [],
    questionNumber: 0,
    answers: [],
    nextButton: false,
    endQuestions: false,
    resetTimer: false,
  };

  componentDidMount() {
    this.startGame();
  }

  shuffleQuestions = (array) => {
    const randomNumber = 0.5;
    return array.sort(() => Math.random() - randomNumber);
  };

  startGame = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    if (data.results.length === 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    } else {
      const shuffleQuestions = data.results.map((element) => {
        const questions = [...element.incorrect_answers, element.correct_answer];
        const shuffle = this.shuffleQuestions(questions);
        return shuffle;
      });
      this.setState({
        questions: data.results,
        answers: shuffleQuestions,
      });
    }
  };

  addScore = () => {
    const { score, assertions, dispatch } = this.props;
    // valor default 10 pontos para resposta correta e timer * dificuldade a ser implementados depois
    const correctAnswer = 10;
    const timer = 1;
    const dificuldade = 1;
    const newScore = score + correctAnswer + (timer * dificuldade);
    const newAssertions = assertions + 1;
    dispatch(updateScore(newScore, newAssertions));
    this.styleBtn();
  };

  styleBtn = () => {
    const elements = document.querySelectorAll('.answer');
    elements.forEach((element) => {
      if (element.classList.contains('correct-answer')) {
        element.classList.add('correct');
        element.disabled = true;
      } else if (element.classList.contains('wrong-answer')) {
        element.classList.add('wrong');
        element.disabled = true;
      }
    });
    this.setState({
      nextButton: true,
    });
  };

  resetStyleBtn = () => {
    const elements = document.querySelectorAll('.answer');
    elements.forEach((element) => {
      if (element.classList.contains('correct-answer')) {
        element.classList.remove('correct');
        element.disabled = false;
      } else if (element.classList.contains('wrong-answer')) {
        element.classList.remove('wrong');
        element.disabled = false;
      }
    });
    this.setState({
      nextButton: false,
    });
  };

  handlerNextButtonClick = () => {
    const { questionNumber, endQuestions } = this.state;
    const { history } = this.props;
    const maxQuestions = 3;
    if (!endQuestions) {
      if (questionNumber === maxQuestions) {
        this.setState({
          endQuestions: true, questionNumber: questionNumber + 1, resetTimer: true });
        this.resetStyleBtn();
      } else {
        this.setState({ questionNumber: questionNumber + 1, resetTimer: true });
        this.resetStyleBtn();
      }
    } else {
      this.setState({ questionNumber: 0, endQuestions: false });
      this.resetTimerFunc();
      this.resetStyleBtn();
      history.push('/feedback');
    }
  };

  resetTimerFunc = () => {
    this.setState({ resetTimer: false });
    this.resetStyleBtn();
  };

  render() {
    const { questions, questionNumber, answers, nextButton, resetTimer } = this.state;
    return (
      <div className="game">
        <Header />
        <h1 className="gameH1">Game</h1>
        {questions.length > 0 && (
          <div className="gameForm">
            <Timer
              styleBtn={ this.styleBtn }
              resetTimer={ resetTimer }
              resetTimerFunc={ this.resetTimerFunc }
            />
            <div className="question">
              <h3
                data-testid="question-category"
              >
                {questions[questionNumber].category}
              </h3>
              <h2 data-testid="question-text">{questions[questionNumber].question}</h2>
            </div>
            <div data-testid="answer-options" className="answer-options">
              { answers[questionNumber].map((element, index) => {
                if (element === questions[questionNumber]
                  .correct_answer) {
                  return (
                    <button
                      key={ index }
                      className="answer correct-answer"
                      data-testid="correct-answer"
                      onClick={ this.addScore }
                    >
                      {element}

                    </button>
                  );
                }
                return (
                  <button
                    key={ index }
                    className="answer wrong-answer"
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ this.styleBtn }
                  >
                    {element}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {nextButton ? (
          <button
            data-testid="btn-next"
            className="btn-next"
            onClick={ this.handlerNextButtonClick }
          >
            next
          </button>
        ) : false}
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Game);
