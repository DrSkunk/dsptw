import * as React from 'react';
import { GameState } from '../models/GameState';
import { DrieZesNegenState } from '../models/Rounds/DrieZesNegenState';
import { RoundName } from '../models/RoundName';
import DrieZesNegen from './playerRounds/DrieZesNegen';
import { OpenDeurState } from '../models/Rounds/OpenDeurState';
import { PuzzelState } from '../models/Rounds/PuzzelState';
import { GalerijState } from '../models/Rounds/GalerijState';
import { CollectiefGeheugenState } from '../models/Rounds/CollectiefGeheugenState';
import { FinaleState } from '../models/Rounds/FinaleState';
import OpenDeur from './playerRounds/OpenDeur';
import Puzzel from './playerRounds/Puzzel';
import Galerij from './playerRounds/Galerij';
import CollectiefGeheugen from './playerRounds/CollectiefGeheugen';
import Finale from './playerRounds/Finale';
import Players from '../components/Players';
import TitleCard from '../components/TitleCard';
import Jury from '../components/Jury';
import AudioPlayer from '../components/Audioplayer';
import { getEventStream } from '../api/localServer';
import { GameEvent } from '../models/GameEvent';

type PlayerViewProps = {
  gameState?: GameState;
};

type PlayerViewState = {
  showTitleCard: boolean;
};

export default class PlayerView extends React.Component<
  PlayerViewProps,
  PlayerViewState
> {
  state = {
    showTitleCard: false,
  };

  componentDidMount() {
    getEventStream().subscribe((gameEventUpdate: GameEvent | unknown) => {
      const gameEvent = gameEventUpdate as GameEvent;
      console.log(gameEvent);
      switch (gameEvent) {
        case GameEvent.NextRound:
          // this.setState({ showTitleCard: true });
          // setTimeout(() => this.setState({ showTitleCard: false }), 5000);
          break;
      }
    });
  }

  render() {
    if (!this.props.gameState) {
      return <div>Not connected to server, is the server online?</div>;
    }
    const {
      currentPlayer,
      roundState,
      currentPlayers,
      episode,
      presenter,
      jury,
      showAnswers,
    } = this.props.gameState;
    const { roundName } = roundState;

    const players = this.props.gameState.players.filter((player, i) =>
      currentPlayers.includes(i)
    );

    let round = null;
    switch (roundName) {
      case RoundName.DrieZesNegen:
        round = <DrieZesNegen roundState={roundState as DrieZesNegenState} />;
        break;
      case RoundName.OpenDeur:
        round = (
          <OpenDeur
            roundState={roundState as OpenDeurState}
            episode={episode}
            showAnswers={showAnswers}
          />
        );
        break;
      case RoundName.Puzzel:
        round = (
          <Puzzel
            roundState={roundState as PuzzelState}
            showAnswers={showAnswers}
          />
        );
        break;
      case RoundName.Galerij:
        round = (
          <Galerij roundState={roundState as GalerijState} episode={episode} />
        );
        break;
      case RoundName.CollectiefGeheugen:
        round = (
          <CollectiefGeheugen
            roundState={roundState as CollectiefGeheugenState}
            episode={episode}
            showAnswers={showAnswers}
          />
        );
        break;
      case RoundName.Finale:
        round = (
          <Finale
            roundState={roundState as FinaleState}
            showAnswers={showAnswers}
          />
        );
        break;
    }

    return (
      <>
        <AudioPlayer />
        {this.state.showTitleCard ? <TitleCard roundName={roundName} /> : null}
        <Jury show={jury.show} cameraLink={jury.cameraLink} name={jury.name} />
        <Players
          players={players}
          currentPlayer={currentPlayer}
          currentPlayers={currentPlayers}
          presenterName={presenter.name}
          presenterCamera={presenter.cameraLink}
        />
        {round}
      </>
    );
  }
}
