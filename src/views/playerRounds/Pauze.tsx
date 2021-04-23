import * as React from 'react';
import styled from 'styled-components';
import { PauzeState } from '../../models/Rounds/PauzeState';
import { Theme } from '../../Theme';
const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 3% 5%;
`;
const Text = styled.div`
  font-size: 70px;
  margin-bottom: 4%;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.75), 2px 2px rgba(0, 0, 0, 0.75);
`;

const PosterClockWrapper = styled.div`
  display: flex;
`;

const Clock = styled.p`
  margin: 22% 0 0 5%;
  /*text-shadow: 1px 1px rgba(0, 0, 0, 0.75), 2px 2px rgba(0, 0, 0, 0.75);

  max-width: 215px;
  text-align: right;
  font-size: 140px;
  font-weight: normal;
  font-style: normal;*/

  font-size: 160px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.75), 2px 2px rgba(0, 0, 0, 0.75);
  background-color: ${Theme.primaryAccent};
  height: 170px;
  padding-top: 55px;
  width: 460px;
  border-radius: 50%;
  line-height: 92px;
  box-shadow: 0px 10px 50px 10px rgba(0, 0, 0, 0.5),
    0px 20px 50px 10px rgba(0, 0, 0, 0.5);
`;

const Poster = styled.img`
  width: 500px;
  height: 700px;
`;

function prefix(input: number) {
  return input < 10 ? '0' + input.toString() : input.toString();
}

type PauzeProps = {
  roundState: PauzeState;
};

type PauzeInternalState = {
  timeLeft: number;
};

export default class Pauze extends React.Component<
  PauzeProps,
  PauzeInternalState
> {
  state = {
    timeLeft: 0,
  };
  // TODO wrong setInterval type
  timer: any;
  componentDidMount() {
    this.timer = setInterval(() => {
      const targetTime = new Date(this.props.roundState.targetTime);
      const currentTime = new Date();
      const timeLeft = targetTime.getTime() - currentTime.getTime();

      this.setState({
        timeLeft,
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  render() {
    const targetTime = new Date(this.props.roundState.targetTime);
    const { timeLeft } = this.state;

    const minutesLeft = Math.floor(timeLeft / 60000);
    const secondsLeft = Math.floor((timeLeft % 60000) / 1000);
    let clock = prefix(minutesLeft) + ':' + prefix(secondsLeft);

    const printTime = `${prefix(targetTime.getHours())}:${prefix(
      targetTime.getMinutes()
    )}`;

    if (timeLeft <= 0) {
      clock = 'NU';
    }
    return (
      <Root>
        <Text>
          {this.props.roundState.text} {printTime}
        </Text>
        <PosterClockWrapper>
          <Poster src="/imgs/poster.png" />
          <Clock>{clock}</Clock>
        </PosterClockWrapper>
      </Root>
    );
  }
}
