import React, { Component } from "react";
import moment from "moment";
import tz from "moment-timezone";

import "./App.css";

const DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado"
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
      latitude: 37.8267,
      longitude: -122.4233
    };
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          latitude,
          longitude
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  showModal = e => {
    e.preventDefault();

    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  render() {
    const { latitude, longitude } = this.state;
    return (
      <div className="App">
        <button onClick={this.showModal}>Open</button>
        {this.state.show ? (
          <Modal latitude={latitude} longitude={longitude} />
        ) : null}
      </div>
    );
  }
}

export default App;

class Modal extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
      loading: false
    };
  }

  componentWillMount() {
    const { latitude, longitude } = this.props;
    this.setState(prevState => ({
      loading: !prevState.loading
    }));

    fetch(
      `http://localhost:3000/api/forecast?latitude=${latitude}&longitude=${longitude}&lang=es`
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState(prevState => ({
          data: res,
          loading: !prevState.loading
        }));
      });
  }

  render() {
    const { loading, data } = this.state;

    if (loading) {
      return <div>loading...</div>;
    }

    return (
      <div className="modal">
        <div className="modal-content">
          <div className="left">
            <h1>Hoy</h1>
            <p>{data.currently.summary}</p>
            <img
              src={`/images/${data.currently.icon}.png`}
              alt={data.currently.summary}
            />
            <p>
              {moment
                .unix(data.currently.time)
                .tz(data.timezone)
                .format("DD/MM/YYYY")}
            </p>
            <p>{data.currently.temperature}º</p>
          </div>
          <div className="space" />
          <div className="right">
            <h3>Pronóstico próximos 7 días</h3>
            <h4>{data.daily.summary}</h4>
            <div className="days">
              {data.daily.data.map(day => (
                <div className="day">
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
