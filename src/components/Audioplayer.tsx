import * as React from 'react';
import { getEventStream, getBaseUrl } from '../api/localServer';
import { GameEvent } from '../models/GameEvent';

const thinkLoopAudio = new Audio(
  '//' + getBaseUrl() + '/static/sound/thinkLoop.mp3'
);
thinkLoopAudio.loop = true;
thinkLoopAudio.volume = 0.15;
const stopClockAudio = new Audio(
  '//' + getBaseUrl() + '/static/sound/stopClock.mp3'
);
stopClockAudio.volume = 0.6;
const answerTimeoutAudio = new Audio(
  '//' + getBaseUrl() + '/static/sound/answerTimeout.mp3'
);
const answerCorrectAudio = new Audio(
  '//' + getBaseUrl() + '/static/sound/answerCorrect.mp3'
);
answerCorrectAudio.volume = 0.5;
const bumperAudio = new Audio('//' + getBaseUrl() + '/static/sound/bumper.mp3');
const itHasHappenedAudio = new Audio(
  '//' + getBaseUrl() + '/static/sound/itHasHappened.mp3'
);
itHasHappenedAudio.volume = 1;
const applauseAudio = new Audio(
  '//' + getBaseUrl() + '/static/sound/applause.mp3'
);
const introLoopAudio = new Audio(
  '//' + getBaseUrl() + '/static/sound/introLoop.mp3'
);
introLoopAudio.loop = true;
introLoopAudio.volume = 0.1;
const openingAudio = new Audio(
  '//' + getBaseUrl() + '/static/sound/opening.mp3'
);
openingAudio.volume = 0.35;

async function stopAndPlayAudio(audio: HTMLAudioElement) {
  if (!audio.error) {
    await audio.pause();
    audio.currentTime = 0;
    await audio.play();
  }
}

function fadeOut(sound: HTMLAudioElement) {
  const initialVolume = sound.volume;
  const intervalId = setInterval(function () {
    if (sound.volume - 0.1 >= 0) {
      sound.volume -= 0.1;
    } else {
      sound.pause();
      introLoopAudio.currentTime = 0;
      introLoopAudio.volume = initialVolume;
      clearInterval(intervalId);
    }
  }, 50);
}

export default class AudioPlayer extends React.Component<unknown, never> {
  componentDidMount() {
    getEventStream().subscribe((gameEventUpdate: GameEvent | unknown) => {
      const gameEvent = gameEventUpdate as GameEvent;
      console.log(gameEvent);
      switch (gameEvent) {
        case GameEvent.StartTime:
          stopAndPlayAudio(thinkLoopAudio);
          break;
        case GameEvent.StopTime:
          thinkLoopAudio.pause();
          stopAndPlayAudio(stopClockAudio);
          break;
        case GameEvent.AnswerTimeout:
          stopAndPlayAudio(answerTimeoutAudio);
          break;
        case GameEvent.AnswerCorrect:
          stopAndPlayAudio(answerCorrectAudio);
          break;
        case GameEvent.NextRound:
          stopAndPlayAudio(bumperAudio);
          stopAndPlayAudio(applauseAudio);
          break;
        case GameEvent.ItHasHappened:
          thinkLoopAudio.pause();
          stopAndPlayAudio(itHasHappenedAudio);
          break;
        case GameEvent.Applause:
          stopAndPlayAudio(applauseAudio);
          break;
        case GameEvent.StartIntroLoop:
          stopAndPlayAudio(introLoopAudio);
          break;
        case GameEvent.StopIntroLoop:
          fadeOut(introLoopAudio);
          // introLoopAudio.pause();
          // introLoopAudio.currentTime = 0;
          break;
        case GameEvent.Opening:
          stopAndPlayAudio(openingAudio);
          break;
      }
    });
  }

  render() {
    return null;
  }
}
