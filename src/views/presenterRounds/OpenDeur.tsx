import * as React from 'react';
import { OpenDeurState } from '../../models/Rounds/OpenDeurState';
import { ViewType } from '../../models/ViewType';
import {
  setView,
  correctAnswer,
  showAllAnsers,
  playVideo,
} from '../../api/localServer';
import { PresenterAnswer } from '../../components/PresenterAnswer';

type OpenDeurProps = {
  roundState: OpenDeurState;
};

export default class OpenDeur extends React.Component<OpenDeurProps, never> {
  onAnswerClick = (i: number) => {
    console.log('onAnswerClick', i);
    const { currentQuestionIndex, questions } = this.props.roundState;
    if (!questions[currentQuestionIndex].answers[i].found) {
      correctAnswer(i);
    }
  };

  render() {
    // TODO button to show answers that weren't found
    const { currentQuestionIndex, questions } = this.props.roundState;
    const presenterAnswers = questions[currentQuestionIndex].answers.map(
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
    return (
      <div>
        OpenDeur
        <button onClick={() => showAllAnsers()}>Show All Answers</button>
        <button onClick={() => setView(ViewType.Videos)}>Show videos</button>
        <button onClick={() => playVideo(0)}>Show video 1</button>
        <button onClick={() => playVideo(1)}>Show video 2</button>
        <button onClick={() => playVideo(2)}>Show video 3</button>
        <div>{questions[currentQuestionIndex].question}</div>
        <ul>{presenterAnswers}</ul>
      </div>
    );
  }
}
