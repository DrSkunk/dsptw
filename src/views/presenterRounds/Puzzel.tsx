import * as React from 'react';
import { PuzzelState } from '../../models/Rounds/PuzzelState';
import { PresenterAnswer } from '../../components/PresenterAnswer';
import {
  correctAnswer,
  showAllAnsers,
  nextQuestion,
} from '../../api/localServer';

type PuzzelProps = {
  roundState: PuzzelState;
};

export default class Puzzel extends React.Component<PuzzelProps, never> {
  onAnswerClick = (i: number) => {
    console.log('onAnswerClick', i);
    const { currentPuzzleIndex, puzzles } = this.props.roundState;
    if (!puzzles[currentPuzzleIndex].answers[i].found) {
      correctAnswer(i);
    }
  };

  render() {
    const { puzzles, currentPuzzleIndex } = this.props.roundState;

    let presenterAnswers = null;

    if (currentPuzzleIndex >= 0) {
      presenterAnswers = puzzles[currentPuzzleIndex].answers.map(
        (answer, i) => (
          <PresenterAnswer
            key={answer.text + i}
            found={answer.found}
            onAnswerClick={() => this.onAnswerClick(i)}
          >
            {answer.text}
          </PresenterAnswer>
        )
      );
    }
    return (
      <div>
        Puzzel {currentPuzzleIndex + 1}
        <button onClick={() => showAllAnsers()}>Show All Answers</button>
        <button onClick={() => nextQuestion()}>Next question</button>
        <ul>{presenterAnswers}</ul>
      </div>
    );
  }
}
