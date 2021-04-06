import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const dateBuilder = (fecha) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[fecha.getDay()];
  let date = fecha.getDate();
  let month = months[fecha.getMonth()];
 
  return `${day} ${date} ${month}`;
};

const key = process.env.REACT_APP_WEATHER_API_KEY

class App extends Component {
  state = {
    info: [],
  };

  handleInputChange = (event) => {
    if (event.key === "Enter") {
      const city = event.target.value;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

      axios
        .get(apiUrl)
        .then((res) => {
          const { data } = res;
          this.setState({ info: data });
        })

        .catch((err) => console.log("err", err));
    }
  };

  render() {
    // let hour = new Date().getHours();

    let whatClassShouldItUse = "app";
    if (typeof this.state.info.weather == "undefined") {
      whatClassShouldItUse = "app";
    } else if (this.state.info.weather[0].main === "Rain") {
      whatClassShouldItUse = "rain";
    } else if (this.state.info.weather[0].main === "Clouds") {
      whatClassShouldItUse = "clouds";
    } else if (this.state.info.weather[0].main === "Snow") {
      whatClassShouldItUse = "snow";
    } else if (this.state.info.weather[0].main === "Fog") {
      whatClassShouldItUse = "fog";
    } else if (this.state.info.weather[0].main === "Drizzle") {
      whatClassShouldItUse = "drizzle";
    } else if (this.state.info.weather[0].main === "Clouds") {
      whatClassShouldItUse = "clouds";
    } else if (this.state.info.weather[0].main === "clear") {
      whatClassShouldItUse = "app";
    }


    return (

     
      <div className={whatClassShouldItUse}>
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="search..."
              onKeyPress={this.handleInputChange}
            />
          </div>
          <div className="location-box">
            <div className="location">{this.state.info.name}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          {typeof this.state.info.main != "undefined" ? (
            <div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(this.state.info.main.temp - 273.15)}º C
                </div>

                <div className="weather">{this.state.info.weather[0].main}</div>
                <div className="pressure">
                  {this.state.info.main.pressure} mbar
                </div>
                <div className="pressure">
                  {this.state.info.main.humidity} % humidity
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </main>
      </div>
    );
  }
}

export default App;
