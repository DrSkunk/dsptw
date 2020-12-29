import * as React from 'react';
import styled from 'styled-components';
import { Name } from './Name';

const Root = styled.div`
  ${(props: { show: boolean }) => (props.show ? null : `display:none;`)}
  position: absolute;
  bottom: 0;
  right: 40px;
  height: 400px;
  width: 480px;
  text-align: center;
`;

const Video = styled.iframe`
  height: 280px;
  width: 480px;
  background: gray;
`;

type JuryProps = {
  show: boolean;
  cameraLink: string;
  name: string;
};

export default class Jury extends React.Component<JuryProps, never> {
  render() {
    return (
      <Root show={this.props.show}>
        <Video src={this.props.cameraLink} />
        <Name>{this.props.name}</Name>
      </Root>
    );
  }
}
