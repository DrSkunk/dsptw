import * as React from 'react';
import { PlayerState } from '../models/PlayerState';
import { Time } from './Time';
import { Name } from './Name';
import { CameraLink } from './CameraLink';

type PlayerProps = {
  playerState: PlayerState;
  isCurrentPlayer: boolean;
  hideTime: boolean;
};

export default class Player extends React.Component<PlayerProps, never> {
  render() {
    const { playerState, isCurrentPlayer, hideTime } = this.props;
    // TODO time running animation
    return (
      <div>
        {playerState.cameraLink ? (
          <CameraLink src={playerState.cameraLink} />
        ) : (
          <CameraLink />
        )}
        <Name>{playerState.name}</Name>
        {hideTime ? null : (
          <Time isCurrentPlayer={isCurrentPlayer}>
            {Math.ceil(playerState.time / 1000)}
          </Time>
        )}
      </div>
    );
  }
}
