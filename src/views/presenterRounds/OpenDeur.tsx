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

    const videoButtons = questions.map((_, i) => {
      return (
        <button key={i} onClick={() => playVideo(i)}>
          Show video {i + 1}
        </button>
      );
    });
    return (
      <div>
        OpenDeur
        <button onClick={() => showAllAnsers()}>Show All Answers</button>
        <button onClick={() => setView(ViewType.Videos)}>Show videos</button>
        {videoButtons}
        <div>{questions[currentQuestionIndex].question}</div>
        <ul>{presenterAnswers}</ul>
      </div>
    );
  }
}
