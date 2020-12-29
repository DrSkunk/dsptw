import * as React from 'react';
import styled from 'styled-components';
import { PuzzelState } from '../../models/Rounds/PuzzelState';
import { Answer } from '../../components/Answer';
import { Theme } from '../../Theme';

const Wrapper = styled.div`
    margin-top 50px;
    display: flex;
    justify-content: center;
`;

const Grid = styled.table`
    text-align: center;
    border-spacing: 10px;
    margin-top 20px;
`;

const AnswersList = styled.div`
  display: grid;
  grid-template-columns: 100%;
  row-gap: 50px;
`;

const GridItem = styled.td`
  font-size: 30px;
  height: 90px;
  width: 200px;
  color: ${(props: { answerIndex: number; found: boolean }) =>
    props.found ? colors[props.answerIndex].textColor : Theme.primary};
  background-color: ${(props: { answerIndex: number; found: boolean }) =>
    props.found ? colors[props.answerIndex].backgroundColor : 'transparent'};
  box-shadow: inset 0px 2px 10px 0px rgba(0, 0, 0, 0.75);
  background-clip: padding-box;
  border-radius: 5px;
  /* text-transform: capitalize; */
  text-shadow: 1px 1px rgba(0, 0, 0, 0.75);
`;
const GridText = styled.span`
  vertical-align: middle;
`;
type PuzzelProps = {
  roundState: PuzzelState;
  showAnswers: boolean;
};

const colors = [
  {
    textColor: '#08417C',
    backgroundColor: '#D9ECFE',
  },
  {
    textColor: '#ECF1EF',
    backgroundColor: '#01468B',
  },
  {
    textColor: '#F0EEF3',
    backgroundColor: '#012040',
  },
];

export default class Puzzel extends React.Component<PuzzelProps, never> {
  render() {
    const { puzzles, currentPuzzleIndex } = this.props.roundState;
    if (currentPuzzleIndex < 0) {
      return null;
    }
    const { grid, answers } = puzzles[currentPuzzleIndex];

    const gridComponent = grid.map((item, i) => (
      <GridItem
        key={item.text + item.answerIndex}
        found={answers[item.answerIndex].found}
        answerIndex={item.answerIndex}
      >
        <GridText>{item.text}</GridText>
      </GridItem>
    ));

    const answersComponent = answers.map((answer, i) => (
      <Answer
        key={answer.text + i}
        score={30}
        found={answer.found}
        showAnswer={this.props.showAnswers}
      >
        {answer.text}
      </Answer>
    ));
    return (
      <Wrapper>
        <Grid>
          <tbody>
            <tr>{gridComponent.slice(0, 3)}</tr>
            <tr>{gridComponent.slice(3, 6)}</tr>
            <tr>{gridComponent.slice(6, 9)}</tr>
            <tr>{gridComponent.slice(9, 12)}</tr>
          </tbody>
        </Grid>
        <AnswersList>{answersComponent}</AnswersList>
      </Wrapper>
    );
  }
}
