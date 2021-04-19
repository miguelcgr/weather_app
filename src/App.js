import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const dateBuilder = (today) => {
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
  let day = days[today.getDay()];
  let date = today.getDate();
  let month = months[today.getMonth()];

  return `${day} ${date} ${month}`;
};

const key = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [info, setInfo] = useState([]);

  const [background, setBackground] = useState("app");

  useEffect(() => {
    if (info.weather) {
      switch (info.weather[0].main) {
        case "Rain":
          setBackground("rain");
          break;
        case "Clouds":
          setBackground("clouds");
          break;
        case "Snow":
          setBackground("snow");
          break;
        case "Fog":
          setBackground("fog");
          break;
        case "Drizzle":
          setBackground("drizzle");
        case "Thunderstorm":
          setBackground("thunderstorm");
        case "Clear":
          setBackground("app");
          break;
      }
    }
  }, [info]);

  const handleInputChange = (event) => {
    console.log("event", event);
    if (event.key === "Enter") {
      const city = event.target.value;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

      axios
        .get(apiUrl)
        .then((res) => {
          const { data } = res;
          console.log("api response", res);

          setInfo(data);
          console.log("info", info);
        })

        .catch((err) => console.log("err", err));
    }
  };

  return (
    <div className={background}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onKeyPress={handleInputChange}
          />
        </div>
        <div className="location-box">
          <div className="location">{info.name}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        {typeof info.main != "undefined" ? (
          <div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(info.main.temp - 273.15)}º C
              </div>

              <div className="weather">{info.weather[0].main}</div>
              <div className="pressure">{info.main.pressure} mbar</div>
              <div className="pressure">{info.main.humidity} % humidity</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};

export default App;
