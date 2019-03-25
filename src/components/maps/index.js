import { h, Component } from 'preact';
import { GOOGLE_API_KEY } from 'src/service/Api';
import * as firebase from 'firebase';

import Map, { GoogleApiWrapper as googleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

@googleApiWrapper({ apiKey: GOOGLE_API_KEY })
class SimpleMapPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      pins: {}
    };
  }

  componentWillMount() {
    const pinsRef = firebase.database().ref('/pins');
    pinsRef.on('value', (snapshot) => {
      this.setState({ pins: snapshot.val() });
    });
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const { pins } = this.state;
    return (
      <Map
        google={this.props.google}
        zoom={13}
        center={{
          lat: 48.8684921,
          lng: 2.3174882
        }}
      >
        {Object.values(pins).map(pin => (
          <Marker
            onClick={this.onMarkerClick}
            img={pin.picture}
            position={{ lat: pin.position.latitude, lng: pin.position.longitude }}
            style={{ height: '200px' }}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <img
              style={{ maxWidth: '150px' }}
              src={this.state.selectedPlace.img}
            />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default SimpleMapPage;
