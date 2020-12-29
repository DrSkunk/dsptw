import * as React from 'react';
import styled from 'styled-components';

const AnswerText = styled.li`
  ${(props: { found: boolean }) =>
    props.found ? `text-decoration: line-through` : ''};
`;

type PresenterAnswerProps = {
  found: boolean;
  onAnswerClick: () => void;
};

export class PresenterAnswer extends React.Component<
  PresenterAnswerProps,
  never
> {
  render() {
    const { found, onAnswerClick } = this.props;
    return (
      <AnswerText found={found}>
        <span onClick={onAnswerClick}>{this.props.children}</span>
      </AnswerText>
    );
  }
}
