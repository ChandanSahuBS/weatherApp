import { useEffect, useState } from 'react';
import styles from './forcast.module.css';
import { apiCall } from '../../api';
const WeatherForcast = ({ theme }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState({});
  const fetchWeather = (cityName) => {
    apiCall(cityName)
      .then((weatherData) => {
        setWeather(weatherData.data);
        setCity('');
        setError('');
      })
      .catch((error) => {
        console.log(error);
        setWeather('');
        setCity('');
        setError({ message: 'City not found', city: cityName });
      });
  };
  useEffect(() => {
    fetchWeather('Delhi');
  }, []);
  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather(city);
    }
  };
  return (
    <div className={`${styles.weatherContainer}}`}>
        <input
          type='text'
          placeholder='Search City'
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>
        <div>
          {weather.main ? (
            <div className={styles.weatherDetails}>
              <div className={styles.weatherHeader}>
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt='weatherImage'
                  className={styles.weatherIcon}
                />
              </div>
              <div className={styles.weatherInfo}>
                <p>
                  Temperature: {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </p>
                <p>Humidity: {Math.round(weather.main.humidity)}%</p>
                <p>Visibility: {Math.round(weather.visibility)} mi</p>
                <p>Wind Speed: {Math.round(weather.wind.speed)} Km/h</p>
              </div>
            </div>
          ) : (
            <div className={styles.error}>{error.message}</div>
          )}
        </div>
    </div>
  );
};
export default WeatherForcast;
