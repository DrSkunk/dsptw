import * as React from 'react';
import {
  playApplause,
  startTime,
  stopTime,
  toggleJury,
} from '../api/localServer';

const buttonsPressed: { [key: number]: boolean } = {};

export default class HotKeys extends React.Component<unknown, never> {
  _handleKeyDown = (event: any) => {
    if (!buttonsPressed[event.keyCode]) {
      buttonsPressed[event.keyCode] = true;
      // TODO fix ctrl issue (keycode 17)
      switch (event.keyCode) {
        // top number row: 1
        case 109: // -
          startTime();
          break;
        // top number row: 2
        case 107: // +
          stopTime();
          break;
        case 120: // F9
          playApplause();
          break;
        case 119: // F8
          toggleJury();
          break;
      }
    }
  };
  _handleKeyUp = (event: any) => {
    delete buttonsPressed[event.keyCode];
  };
  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('keyup', this._handleKeyUp);
  }

  componentWillUnmount() {
    // document.removeEventListener('keydown', this._handleKeyDown);
  }
  render() {
    return null;
  }
}
