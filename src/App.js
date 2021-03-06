import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { withAlert } from 'react-alert';

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
    this.setState(prevState => {
      this.props.alert.error(error);

      return {
        error,
        show: !prevState.show,
      };
    });
  };

  render() {
    const { latitude, longitude, defaultCenter } = this.state;
    const { REACT_APP_GOOGLE_MAPS_TOKEN } = process.env;

    return (
      <div className="App">
        <div className="left">
          <h2>Acidlab challenge</h2>

          <p>
            Tecnologies used here:
            <ul>
              <li>Google Maps</li>
              <li>Google GeoCode</li>
              <li>Darksky</li>
              <li>Restcountries</li>
              <li>ReactJS</li>
              <li>NodeJS</li>
              <li>Redis</li>
              <li>Docker</li>
              <li>Docker compose</li>
              <li>Traefik</li>
            </ul>
          </p>

          <p>
            Repositories:
            <ul>
              <li>
                <a
                  href="https://github.com/rodrwan/madmas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  madams
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rodrwan/gmarcone"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  gmarcone
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rodrwan/forecast-manifest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Manifest
                </a>
              </li>
              <li>
                <a
                href="http://dockhero-rugged-50468.dockhero.io:8080/dashboard/"
                target="_blank"
                  rel="noopener noreferrer"
                >
                  Traefik Dashboard
                </a>
              </li>
            </ul>
          </p>
        </div>
        <div className="right">
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
      </div>
    );
  }
}

App.propTypes = {
  alert: PropTypes.shape({
    error: PropTypes.func,
  }).isRequired,
};

export default withAlert(App);
