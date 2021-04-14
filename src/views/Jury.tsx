import * as React from 'react';
import styled from 'styled-components';
import { GameState } from '../models/GameState';
import { showJury, hideJury } from '../api/localServer';

const Name = styled.div`
  font-size: 3em;
  text-align: center;
`;

const Button = styled.button`
  width: 80vw;
  height: 75vh;
  margin: 10vh 10vw;
  font-size: 6em;
`;

export default class Jury extends React.Component<
  {
    gameState?: GameState;
  },
  never
> {
  onCLick = () => {
    if (this.props.gameState?.jury.show) {
      hideJury();
    } else {
      showJury();
    }
  };

  render() {
    const { gameState } = this.props;
    return (
      <div>
        <Name>{gameState?.jury.name}</Name>
        <Button onClick={this.onCLick}>
          {gameState?.jury.show ? 'Hide yo self' : 'Show yo self'}
        </Button>
      </div>
    );
  }
}
