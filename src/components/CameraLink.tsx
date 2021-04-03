import * as React from 'react';
import CSS from 'csstype';

type CameraLinkProps = {
  src?: string;
  focused?: boolean;
};

export class CameraLink extends React.Component<CameraLinkProps, never> {
  render() {
    const { src, focused } = this.props;
    let styles: CSS.Properties = {
      width: '100%',
      height: '280px',
      border: 'none',
    };
    if (focused) {
      styles = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        border: 'none',
        overflow: 'hidden',
      };
    }
    return <iframe src={src} style={styles} />;
  }
}
