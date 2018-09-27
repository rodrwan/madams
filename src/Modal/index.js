import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// eslint-disable-next-line
import tz from 'moment-timezone';
import RingLoader from 'react-spinners/RingLoader';

const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

class Modal extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
      loading: false,
    };
  }

  componentWillMount() {
    const { REACT_APP_GMARCONE_API_URL } = process.env;
    const { latitude, longitude } = this.props;
    this.setState(prevState => ({
      loading: !prevState.loading,
    }));
    const URL = `${REACT_APP_GMARCONE_API_URL}/api/forecast?latitude=${latitude}&longitude=${longitude}&lang=es`;
    fetch(URL)
      .then(res => {
        if (res.status === 400) {
          const error = 'No pudimos encontrar datos de esa zona que clickeaste :(';
          this.props.displayError(error);

          return Promise.reject(new Error(error));
        }

        return res.json();
      })
      .then(res => {
        this.setState(prevState => ({
          data: res,
          loading: !prevState.loading,
        }));
      })
      // eslint-disable-next-line
      .catch(err => console.error(err));
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = event => {
    if (event.keyCode === 27) {
      this.props.hideModal(event);
    }
  };

  render() {
    const { loading, data } = this.state;
    if (loading) {
      const override = {
        position: 'fixed !important',
        zIndex: 2,
        display: 'block',
        margin: '0 auto',
        borderColor: 'red',
        top: '40%',
        bottom: '50%',
        left: 0,
        right: 0,
      };

      return (
        <div className="loader-background">
          <RingLoader
            sizeUnit={'px'}
            size={150}
            className={override}
            color={'#123abc'}
            loading={loading}
          />
        </div>
      );
    }

    return (
      <div className="modal">
        <div className="modal-content">
          <div className="header">
            <button onClick={this.props.hideModal}>X</button>
          </div>
          <div className="left">
            <h3>Hoy en {data.name} </h3>
            <p>{data.currently.summary}</p>
            <img src={`/images/${data.currently.icon}.png`} alt={data.currently.summary} />
            <p>
              {moment
                .unix(data.currently.time)
                .tz(data.timezone)
                .format('DD/MM/YYYY')}
            </p>
            <p>{data.currently.temperature}º</p>
          </div>
          <div className="space" />
          <div className="right">
            <h3>Pronóstico próximos 7 días</h3>
            <h4>{data.daily.summary}</h4>
            <div className="days">
              {data.daily.data.map(day => (
                <div className="day" key={`${day.time}-key`}>
                  <h2>
                    {
                      DAYS[
                        moment
                          .unix(day.time)
                          .tz(data.timezone)
                          .day()
                      ]
                    }
                  </h2>
                  <img src={`/images/${day.icon}.png`} alt={day.summary} />
                  <p>
                    Min: {day.temperatureLow.toFixed(1)}º<br />
                    Max: {day.temperatureHigh.toFixed(1)}º
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  hideModal: PropTypes.func.isRequired,
  displayError: PropTypes.func.isRequired,
};

export default Modal;
