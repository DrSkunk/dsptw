import * as React from 'react';
import Presenter from './views/Presenter';
import { openConnection, getGameStateUpdateStream } from './api/localServer';
import PlayerView from './views/PlayerView';
import { GameState } from './models/GameState';
// import { setScene } from './api/obs';

type AppState = {
  isPresenter: boolean;
  gameState?: GameState;
};

export default class Hello extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    const presenter = new URL(window.location.toString()).searchParams.get(
      'presenter'
    );
    this.state = {
      isPresenter: presenter !== null,
      gameState: undefined,
    };
  }

  componentDidMount() {
    // TODO config for connection
    openConnection();
    // TODO fix type any to GameState
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
    const { isPresenter } = this.state;
    console.log('state', this.state);
    return (
      <>
        {isPresenter ? (
          <Presenter gameState={this.state.gameState} />
        ) : (
          <PlayerView gameState={this.state.gameState} />
        )}
      </>
    );
  }
}
