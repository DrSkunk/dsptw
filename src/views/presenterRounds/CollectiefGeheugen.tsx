import * as React from 'react';
import { CollectiefGeheugenState } from '../../models/Rounds/CollectiefGeheugenState';
import { PresenterAnswer } from '../../components/PresenterAnswer';
import {
  setView,
  correctAnswer,
  showAllAnsers,
  playVideo,
} from '../../api/localServer';
import { ViewType } from '../../models/ViewType';

type CollectiefGeheugenProps = {
  roundState: CollectiefGeheugenState;
};

export default class CollectiefGeheugen extends React.Component<
  CollectiefGeheugenProps,
  never
> {
  onAnswerClick = (i: number) => {
    console.log('onAnswerClick', i);
    const { currentQuestionIndex, questions } = this.props.roundState;
    if (!questions[currentQuestionIndex].answers[i].found) {
      correctAnswer(i);
    }
  };
  render() {
    // TODO correct coloring for missing answers
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
        Collectief Geheugen
        <button onClick={() => showAllAnsers()}>Show All Answers</button>
        <button onClick={() => setView(ViewType.Videos)}>Show videos</button>
        {videoButtons}
        <ul>{presenterAnswers}</ul>
      </div>
    );
  }
}
