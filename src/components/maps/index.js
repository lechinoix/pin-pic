import { h, Component } from 'preact';
import { GOOGLE_API_KEY } from 'src/service/Api';
import * as firebase from 'firebase';

import Map, { GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class SimpleMapPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      pins: [],
    };
  }

  componentWillMount() {
    const pinsRef = firebase.database().ref('/pins');
    pinsRef.on('value', (snapshot) => {
      this.setState({
        ...this.state,
        pins: [
          ...this.state.pins,
          ...snapshot.val(),
        ]
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pictureUrl) this.addPinOnMap(nextProps.pictureUrl);
  }

  addPinOnMap = (picture) => {
    const pinsRef = firebase.database().ref('/pins');

    navigator.geolocation.getCurrentPosition((pos) => {
      const newPin = {
        position: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        },
        picture,
      };
      this.setState({
        ...this.state,
        pins: [
          ...this.state.pins,
          newPin,
        ]
      });
      pinsRef.push(newPin);
    }, (err) => {
      console.log(err);
    })

  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
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
          lng: 2.3174882,
        }}
      >
        {pins.map(pin => (
          <Marker
            onClick={this.onMarkerClick}
            img={pin.picture}
            position={{ lat: pin.position.latitude, lng: pin.position.longitude }}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
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

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(SimpleMapPage);
