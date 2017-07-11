import { h, Component } from 'preact';
import style from './style';
import Maps from 'src/components/maps';
import { Button } from 'preact-mdl';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			picture: null,
		}
	}

	gotMedia = (mediaStream) => {
		const mediaStreamTrack = mediaStream.getVideoTracks()[0];
		const imageCapture = new ImageCapture(mediaStreamTrack);
		imageCapture.takePhoto()
	  .then(blob => {
	    this.setState({ picture: URL.createObjectURL(blob)});
	    img.onload = () => { URL.revokeObjectURL(this.src); }
	  })
	  .catch(error => console.error('takePhoto() error:', error));
	}

	takePicture = () => {
		navigator.mediaDevices.getUserMedia({video: true})
		  .then(this.gotMedia)
		  .catch(error => console.error('getUserMedia() error:', error));
	}

	render() {
		return (
			<div class={style.home}>
				<Maps />
				<div class={style.picture}>
					<img
						src={this.state.picture}
						onLoad={() => { URL.revokeObjectURL(this.state.picture); }}
					/>
				</div>
				<div class={style.addButton}>
					<Button
						onClick={this.takePicture}
						fab
						raised
						colored
					>+</Button>
				</div>
			</div>
		);
	}
}
