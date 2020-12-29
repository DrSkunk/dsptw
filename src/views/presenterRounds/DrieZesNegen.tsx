import * as React from 'react';
import { DrieZesNegenState } from '../../models/Rounds/DrieZesNegenState';
import { correctAnswer, nextQuestion } from '../../api/localServer';

type DrieZesNegenProps = {
  roundState: DrieZesNegenState;
};

export default class DrieZesNegen extends React.Component<
  DrieZesNegenProps,
  never
> {
  render() {
    const { currentQuestionIndex, questions } = this.props.roundState;

    let question = '';
    let answer = '';
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      question = questions[currentQuestionIndex].question;
      answer = questions[currentQuestionIndex].answer;
    }

    return (
      <div>
        <button onClick={() => nextQuestion()}>Next Question</button>
        <button onClick={() => correctAnswer()}>Correct Answer</button>
        <div>{question}</div>
        <div>{answer}</div>
      </div>
    );
  }
}
