import * as React from 'react';
import { GalerijState } from '../../models/Rounds/GalerijState';
import styled from 'styled-components';
import { getBaseUrl } from '../../api/localServer';

type GalerijProps = {
  roundState: GalerijState;
  episode: number;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Image = styled.img`
  box-shadow: 0px 10px 50px 10px rgba(0, 0, 0, 0.5),
    0px 20px 50px 10px rgba(0, 0, 0, 0.5);
`;

export default class Galerij extends React.Component<GalerijProps, never> {
  render() {
    const { currentImageIndex } = this.props.roundState;

    let currentQuestionSeriesIndex = this.props.roundState
      .currentQuestionSeriesIndex;

    if (currentQuestionSeriesIndex < 0) {
      currentQuestionSeriesIndex = 0;
    }
    return (
      <Wrapper>
        {currentImageIndex !== -1 ? (
          <Image
            height={550}
            src={`//${getBaseUrl()}/static/aflevering${
              this.props.episode
            }/galerij/${currentQuestionSeriesIndex + 1}/${
              currentImageIndex + 1
            }.jpg`}
          />
        ) : null}
      </Wrapper>
    );
  }
}
