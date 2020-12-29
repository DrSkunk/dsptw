import * as React from 'react';
import styled from 'styled-components';
import { Answer } from '../../components/Answer';
import { FinaleState } from '../../models/Rounds/FinaleState';

const AnswersWrapper = styled.div`
  margin-top: 100px;
`;
const AnswersRow = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

type FinaleProps = {
  roundState: FinaleState;
  showAnswers: boolean;
};

export default class Finale extends React.Component<FinaleProps, never> {
  render() {
    const { questions, currentQuestionIndex } = this.props.roundState;

    const answers = questions[currentQuestionIndex].answers.map((answer, i) => (
      <Answer
        key={answer.text + i}
        score={20}
        found={answer.found}
        showAnswer={this.props.showAnswers}
      >
        {answer.text}
      </Answer>
    ));
    return (
      <AnswersWrapper>
        <AnswersRow>{answers.slice(0, 3)}</AnswersRow>
        <AnswersRow>{answers.slice(3, 5)}</AnswersRow>
      </AnswersWrapper>
    );
  }
}
