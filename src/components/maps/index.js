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
      marker: {},
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.pictureUrl) this.placePinOnMap(nextProps.pictureUrl);
  }

  placePinOnMap = (pictureUrl) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({
        ...this.state,
        marker: {
          pos: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
          pictureUrl,
        }
      });
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
    const marker = this.state.marker;
    return (
      <Map
        google={this.props.google}
        zoom={13}
        center={{
          lat: 48.8684921,
          lng: 2.3174882,
        }}
      >
        {marker.hasOwnProperty('pos') ?
          <Marker
            onClick={this.onMarkerClick}
            img={marker.pictureUrl}
            position={{ lat: marker.pos.latitude, lng: marker.pos.longitude }}
          /> :
          null}
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
