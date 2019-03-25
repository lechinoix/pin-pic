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
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpened) setTimeout(this.startMedia, 300);
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      if (e.key === 'Escape') {
        this.props.closeModalVideo();
        this.stopRecording();
      }
    };
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }

  stopRecording = () => {
    const mediaStreamTrack = this.state.mediaStream.getVideoTracks()[0];
    mediaStreamTrack.stop();
  }

  startMedia = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((mediaStream) => {
        this.setState({ mediaStream });
        this.video.srcObject = mediaStream;
        this.video.play();
      })
      .catch(error => console.error('getUserMedia() error:', error));
  }

  onTakePicture = () => {
    const mediaStreamTrack = this.state.mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);
    imageCapture.takePhoto()
      .then(blob => {
        this.stopRecording();
        const reader = new window.FileReader();
        reader.onloadend = this.props.onTakePicture;
        reader.readAsDataURL(blob);
      });
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
        <video
          ref={(video) => {this.video = video;}}
          style={styles.video}
        />
        <Button
          raised
          colored
          fab
          style={styles.button}
          onClick={this.onTakePicture}
        >
          <Icon icon="camera" />
        </Button>
      </div>
    );
  }
}
