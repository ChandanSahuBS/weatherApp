import axios from "axios";
import React, { useEffect, useState } from "react";
import apiKeys from "./apiKeys";

const WeatherForcast = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = (cityName) => {
    axios
      .get(
        `${apiKeys.basename}weather?q=${
          cityName === "[object Object]" ? cityName : city
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((weatherData) => {
        setWeather(weatherData.data);
        setCity("");
      })
      .catch((error) => {
        console.log(error);
        setWeather("");
        setCity("");
        setError({ message: "Not Found", city });
      });
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search City"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button onClick={search}>Search</button>
        <div>
          {typeof weather.main !== "undefined" ? (
            <div>
              {" "}
              <li>
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="weatherImage"
                />
              </li>
              <li>
                Temperature{" "}
                <span>
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity <span>{Math.round(weather.main.humidity)}%</span>
              </li>
              <li>
                Visibility <span>{Math.round(weather.visibility)} mi</span>
              </li>
              <li>
                Wind Speed <span>{Math.round(weather.wind.speed)} Km/h</span>
              </li>
            </div>
          ) : (
            <div>{error.message + "  " + error.city}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherForcast;
