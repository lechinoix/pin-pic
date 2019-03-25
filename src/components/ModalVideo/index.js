import { h, Component } from 'preact';
import mdl from 'material-design-lite/material';
import { Button, Icon } from 'preact-mdl';

export default class ModalVideo extends Component {
  constructor(props) {
    super(props);
    this.video = null;
    this.state = {
      mediaStream: null
    };
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      if (e.key === 'Escape') {
        this.props.closeModalVideo();
      }
    };
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }

  render() {
    const styles = {
      container: {
        backgroundColor: 'black',
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: this.props.isOpened ? 0 : '100vh',
        transition: 'top 0.3s',
        zIndex: 60
      },
      video: {
        width: '100vw',
        height: '100vh'

      },
      button: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: '87vh'
      }
    };
    return (
      <div style={styles.container}>
        <Button
          raised
          colored
          fab
          style={styles.button}
        >
          <Icon icon="camera" />
        </Button>
      </div>
    );
  }
}
