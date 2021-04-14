import * as React from 'react';
import Presenter from './views/Presenter';
import { openConnection, getGameStateUpdateStream } from './api/localServer';
import PlayerView from './views/PlayerView';
import { GameState } from './models/GameState';
import Jury from './views/Jury';
// import { setScene } from './api/obs';

type AppState = {
  isPresenter: boolean;
  isJury: boolean;
  gameState?: GameState;
};

export default class Hello extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    const presenter = new URL(window.location.toString()).searchParams.get(
      'presenter'
    );
    const jury = new URL(window.location.toString()).searchParams.get('jury');
    this.state = {
      isPresenter: presenter !== null,
      isJury: jury !== null,
      gameState: undefined,
    };
  }

  componentDidMount() {
    // TODO config for connection
    openConnection();
    getGameStateUpdateStream().subscribe(
      (gameStateUpdate: GameState | unknown) => {
        const gameState = gameStateUpdate as GameState;
        console.log('gameStateUpdate', gameState);
        this.setState({
          gameState,
        });
      }
    );
  }

  render() {
    const { isPresenter, isJury } = this.state;
    if (isPresenter) {
      return <Presenter gameState={this.state.gameState} />;
    } else if (isJury) {
      return <Jury gameState={this.state.gameState} />;
    }
    return <PlayerView gameState={this.state.gameState} />;
  }
}
