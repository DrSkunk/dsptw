import * as React from 'react';
import styled from 'styled-components';
import {
  previousRound,
  nextRound,
  startTime,
  stopTime,
  nextStartingPlayer,
  nextPlayerToComplete,
  setPlayerName,
  setPlayerTime,
  setPlayerCameraLink,
  showJury,
  hideJury,
  playApplause,
  startIntroLoop,
  stopIntroLoop,
  playOpening,
  focusPlayer,
  setPauseTargetTime,
} from '../api/localServer';
import { GameState } from '../models/GameState';
import { DrieZesNegenState } from '../models/Rounds/DrieZesNegenState';
import { RoundName } from '../models/RoundName';
import DrieZesNegen from './presenterRounds/DrieZesNegen';
import { OpenDeurState } from '../models/Rounds/OpenDeurState';
import { PuzzelState } from '../models/Rounds/PuzzelState';
import { GalerijState } from '../models/Rounds/GalerijState';
import { CollectiefGeheugenState } from '../models/Rounds/CollectiefGeheugenState';
import { FinaleState } from '../models/Rounds/FinaleState';
import OpenDeur from './presenterRounds/OpenDeur';
import Puzzel from './presenterRounds/Puzzel';
import Galerij from './presenterRounds/Galerij';
import CollectiefGeheugen from './presenterRounds/CollectiefGeheugen';
import Finale from './presenterRounds/Finale';
import SocketStatus from '../components/SocketStatus';
import HotKeys from '../components/HotKeys';

const Wrapper = styled.div`
  font-size: 2em;
`;

type PresenterProps = {
  gameState?: GameState;
};

type PresenterState = {
  playerNames: string[];
  playerTimes: number[];
  playerCameraLinks: string[];
  showEditor: boolean;
  pauzeTargetTime: string;
};

export default class Presenter extends React.Component<
  PresenterProps,
  PresenterState
> {
  state = {
    playerNames: [],
    playerTimes: [],
    playerCameraLinks: [],
    showEditor: false,
    pauzeTargetTime: '',
  };

  // _handleKeyDown = (event: any) => {
  //   console.log(event);
  //   switch (event.keyCode) {
  //     // top number row: 1
  //     case 49:
  //       startTime();
  //       break;
  //     // top number row: 2
  //     case 50:
  //       stopTime();
  //       break;
  //   }
  // };

  // componentDidMount() {
  // document.addEventListener('keydown', this._handleKeyDown);
  // }

  // componentWillUnmount() {
  // document.removeEventListener('keydown', this._handleKeyDown);
  // }

  toggleTimer = () => {
    if (this.props.gameState?.timerIsRunning) {
      console.log('stopping timer');
      stopTime();
    } else {
      console.log('starting timer');
      startTime();
    }
  };

  onNameChange = (index: number, name: string) => {
    this.setState((state) => {
      const playerNames = [...state.playerNames];
      playerNames[index] = name;
      return { playerNames };
    });
  };

  setPlayerName = (index: number) => {
    setPlayerName(index, this.state.playerNames[index]);
  };

  onTimeChange = (index: number, timeString: string) => {
    const time = Number.parseInt(timeString);
    this.setState((state) => {
      const playerTimes = [...state.playerTimes];
      playerTimes[index] = time;
      return { playerTimes };
    });
  };

  setPlayerTime = (index: number) => {
    setPlayerTime(index, this.state.playerTimes[index]);
  };

  onCameraLinkChange = (index: number, videoLink: string) => {
    this.setState((state) => {
      const playerCameraLinks = [...state.playerCameraLinks];
      playerCameraLinks[index] = videoLink;
      return { playerCameraLinks };
    });
  };

  setCameraLink = (index: number) => {
    setPlayerCameraLink(index, this.state.playerCameraLinks[index]);
  };

  setPauzeTargetTime = (e: any) => {
    this.setState({
      pauzeTargetTime: e.target.value,
    });
  };

  render() {
    if (!this.props.gameState) {
      return <div>Not connected to server, is the server online?</div>;
    }
    const {
      currentPlayer,
      roundState,
      players,
      timerIsRunning,
    } = this.props.gameState;
    const { roundName } = roundState;

    const playersComponent = players.map((player, i) => (
      <li
        key={player.name + i}
        style={
          currentPlayer === i
            ? {
                textDecoration: 'underline',
              }
            : {}
        }
      >
        {player.name} - {Math.ceil(player.time / 1000)} - {player.time}
      </li>
    ));

    const editor = players.map((player, i) => (
      <li
        key={player.name + i}
        style={
          currentPlayer === i
            ? {
                textDecoration: 'underline',
              }
            : {}
        }
      >
        {player.name} - {Math.ceil(player.time / 1000)}
        <input
          type="text"
          value={this.state.playerNames[i]}
          onChange={(e) => this.onNameChange(i, e.target.value)}
        />
        <button onClick={() => this.setPlayerName(i)}>Set name</button>
        <input
          type="number"
          value={this.state.playerTimes[i]}
          onChange={(e) => this.onTimeChange(i, e.target.value)}
        />
        <button onClick={() => this.setPlayerTime(i)}>Set time</button>
        <input
          type="text"
          value={this.state.playerCameraLinks[i]}
          onChange={(e) => this.onCameraLinkChange(i, e.target.value)}
        />
        <button onClick={() => this.setCameraLink(i)}>Set Camera</button>
      </li>
    ));

    let round = null;
    switch (roundName) {
      case RoundName.DrieZesNegen:
        round = <DrieZesNegen roundState={roundState as DrieZesNegenState} />;
        break;
      case RoundName.OpenDeur:
        round = <OpenDeur roundState={roundState as OpenDeurState} />;
        break;
      case RoundName.Puzzel:
        round = <Puzzel roundState={roundState as PuzzelState} />;
        break;
      case RoundName.Galerij:
        round = <Galerij roundState={roundState as GalerijState} />;
        break;
      case RoundName.CollectiefGeheugen:
        round = (
          <CollectiefGeheugen
            roundState={roundState as CollectiefGeheugenState}
          />
        );
        break;
      case RoundName.Finale:
        round = <Finale roundState={roundState as FinaleState} />;
        break;
    }

    const cameraFocusButtons = players.map((player, i) => (
      <button key={'cameraFocus' + i} onClick={() => focusPlayer(i)}>
        {player.name}
      </button>
    ));

    return (
      <Wrapper>
        <HotKeys />
        <SocketStatus />
        <h1>{roundName}</h1>
        <ul>{playersComponent}</ul>
        <button
          onClick={() => {
            this.setState((state) => ({
              showEditor: !state.showEditor,
            }));
          }}
        >
          Toggle editor
        </button>
        {this.state.showEditor ? (
          <>
            <ul>{editor}</ul>
            <div>
              Pauze Target Time:{' '}
              <input
                type="time"
                onChange={this.setPauzeTargetTime}
                value={this.state.pauzeTargetTime}
              ></input>
              <button
                onClick={() => setPauseTargetTime(this.state.pauzeTargetTime)}
              >
                Set pauze time
              </button>
            </div>
          </>
        ) : null}
        <div>Timer is running: {timerIsRunning.toString()}</div>
        <button onClick={this.toggleTimer}>
          {timerIsRunning ? 'Stop timer (+)' : 'Start timer (-)'}
        </button>
        <div>
          <button onClick={() => showJury()}>Show jury (F8)</button>
          <button onClick={() => hideJury()}>Hide jury (F8)</button>
          <button onClick={() => playApplause()}>Applause (F9)</button>
          <button onClick={() => startIntroLoop()}>Play Intro Loop</button>
          <button onClick={() => stopIntroLoop()}>Stop Intro Loop</button>
          <button onClick={() => playOpening()}>Play Opening</button>
        </div>
        <div>
          Focus:
          <button onClick={() => focusPlayer(-1)}>unfocus</button>
          {cameraFocusButtons}
        </div>
        <div>
          <button onClick={() => nextStartingPlayer()}>
            Next starting player
          </button>
          <button onClick={() => nextPlayerToComplete()}>
            Next complete player
          </button>
        </div>
        <div>
          <button onClick={() => previousRound()}>Previous round</button>
          <button onClick={() => nextRound()}>Next round</button>
        </div>
        <hr />
        {round}
      </Wrapper>
    );
  }
}
