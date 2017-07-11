import { h, Component } from 'preact';
import { GOOGLE_API_KEY } from 'src/service/Api';

import Map, { GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class SimpleMapPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
  };

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
    return (
      <Map
        style={{ width: '80%', height: '50%' }}
        google={this.props.google}
        zoom={13}
        center={{
          lat: 48.8684921,
          lng: 2.3174882,
        }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'PWA Paris'}
          position={{lat: 48.8827176, lng: 2.3202777}}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(SimpleMapPage);