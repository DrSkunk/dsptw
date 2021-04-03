import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { Theme } from '../Theme';

const visibility = keyframes`
0%   {opacity:1;}
75%  {opacity:1;}
100% {opacity:0;}
`;

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: none;
  position: absolute;
  top: 0;
  left: 0;
  background: radial-gradient(
    circle,
    rgba(38, 88, 133, 1) 0%,
    rgba(16, 28, 42, 1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  animation-duration: ${(props: { duration: number }) => props.duration + 1}s;
  animation-name: ${visibility};
`;

const breatheAnimation = keyframes`
    0% { transform: rotate3d(1, 1, 1, -40deg) }
    100% { transform: rotate3d(1, 1, 1, 20deg) }
`;

const RoundName = styled.div`
  padding: 100px;
  border-radius: 50%;
  font-size: 180px;
  text-transform: uppercase;
  color: ${Theme.primary};
  text-shadow: 0px 2px 1px rgba(0, 0, 0, 0.5);
  text-shadow: 0px 10px 1px rgba(38, 88, 133, 1);
  animation-name: ${breatheAnimation};
  animation-duration: ${(props: { duration: number }) => props.duration + 1}s;
  background: radial-gradient(
    circle,
    rgba(202, 61, 54, 1) 0%,
    rgba(88, 11, 15, 1) 100%
  );
  max-width: 60%;
  text-align: center;
  box-shadow: 0px 10px 50px 10px rgba(0, 0, 0, 0.5),
    0px 20px 50px 10px rgba(0, 0, 0, 0.5);
`;

type TitleCardProps = {
  roundName: string;
  duration?: number;
};

export default class TitleCard extends React.Component<TitleCardProps, never> {
  render() {
    const duration = this.props.duration ? this.props.duration : 5;
    return (
      <Root duration={duration}>
        <RoundName duration={duration}>{this.props.roundName}</RoundName>
      </Root>
    );
  }
}
