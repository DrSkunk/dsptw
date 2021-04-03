import * as React from 'react';
import styled from 'styled-components';
import { PlayerState } from '../models/PlayerState';
import Player from './Player';
import { CameraLink } from './CameraLink';
import { Name } from './Name';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 100vw;
`;

const Presenter = styled.div`
  flex-grow: 1;
`;

type PlayersProps = {
  players: PlayerState[];
  currentPlayers: number[];
  currentPlayer: number;
  presenterName: string;
  presenterCamera: string;
};

export default class Players extends React.Component<PlayersProps, never> {
  render() {
    const {
      currentPlayer,
      currentPlayers,
      players,
      presenterName,
      presenterCamera,
    } = this.props;

    const playersComponent = players.map((player, i) => (
      <Player
        key={player.name}
        playerState={player}
        isCurrentPlayer={currentPlayer === currentPlayers[i]}
        hideTime={false}
      />
    ));
    console.log(currentPlayer, currentPlayers);
    // TODO add presenter info in config and gamestate
    return (
      <Root>
        {playersComponent}
        <Presenter>
          <CameraLink src={presenterCamera} />
          <Name>{presenterName}</Name>
        </Presenter>
      </Root>
    );
  }
}
