import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

import Modal from './Modal';
import './App.css';

const styles = [
  {
    stylers: [{ hue: '#A3DAFD' }, { saturation: -20 }],
  },
  {
    featureType: 'landscape',
    stylers: [{ hue: '#ffff66' }, { saturation: 100 }],
  },
  {
    featureType: 'road',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.locality',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'landscape.man_made',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'landscape.natural',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      latitude: 0,
      longitude: 0,
      defaultCenter: { lat: 0, lng: 0 },
      countryName: '',
      error: null,
    };
  }

  onChildClick = event => {
    const { lat, lng } = event;

    this.setState(prevState => ({
      error: null,
      show: !prevState.show,
      latitude: lat,
      longitude: lng,
    }));
  };

  showModal = e => {
    e.preventDefault();

    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  hideModal = e => {
    e.preventDefault();

    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  displayError = error => {
    this.setState(prevState => ({
      error,
      show: !prevState.show,
    }));
  };

  render() {
    const { latitude, longitude, defaultCenter } = this.state;
    const { REACT_APP_GOOGLE_MAPS_TOKEN } = process.env;

    return (
      <div className="App">
        {this.state.error ? <div>{this.state.error}</div> : null}
        <GoogleMapReact
          bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAPS_TOKEN }}
          defaultCenter={defaultCenter}
          defaultZoom={2}
          options={maps => ({
            minZoom: 2,
            zoomControl: false,
            mapTypeId: maps.MapTypeId.ROADMAP,
            styles,
            disableDoubleClickZoom: true,
            fullscreenControl: false,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: false,
            language: 'es',
          })}
          onClick={this.onChildClick}
        />
        {this.state.show ? (
          <Modal
            latitude={latitude}
            longitude={longitude}
            hideModal={this.hideModal}
            displayError={this.displayError}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
