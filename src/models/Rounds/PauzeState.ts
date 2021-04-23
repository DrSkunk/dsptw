import { RoundName } from '../RoundName';

export type PauzeState = {
  roundName: RoundName;
  targetTime: Date;
  text: string;
};
