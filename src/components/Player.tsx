import * as React from 'react';
import { PlayerState } from '../models/PlayerState';
import { Time } from './Time';
import { Name } from './Name';
import { CameraLink } from './CameraLink';
import styled from 'styled-components';

type PlayerProps = {
  playerState: PlayerState;
  isCurrentPlayer: boolean;
  hideTime: boolean;
};

const Root = styled.div`
  flex-grow: 1;
`;

export default class Player extends React.Component<PlayerProps, never> {
  render() {
    const { playerState, isCurrentPlayer, hideTime } = this.props;
    // TODO time running animation
    return (
      <Root>
        {playerState.cameraLink ? (
          <CameraLink
            src={playerState.cameraLink}
            focused={playerState.focused}
          />
        ) : (
          <CameraLink />
        )}
        <Name>{playerState.name}</Name>
        {hideTime ? null : (
          <Time isCurrentPlayer={isCurrentPlayer}>
            {Math.ceil(playerState.time / 1000)}
          </Time>
        )}
      </Root>
    );
  }
}
