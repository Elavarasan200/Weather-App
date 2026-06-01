import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './App.css';

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('City not found. Please check the spelling.');
      } else if (err.response?.status === 401) {
        setError('Invalid API key. Check your OpenWeatherMap key.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  return (
    <div className="app">
      <div className="container">
        <p className="app-label">🌤 Weather App</p>
        <h1 className="app-heading">Real-time Weather Report</h1>

        {/* Search Section */}
        <div className="search-row">
          <input
            className="search-input"
            type="text"
            placeholder="Enter city name (e.g. Chennai, London...)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="search-btn"
            onClick={fetchWeather}
            disabled={loading}
          >
            {loading ? 'Searching...' : '🔍 Search'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-box">
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            Fetching weather data...
          </div>
        )}

        {/* Weather Card Component */}
        {weatherData && <WeatherCard data={weatherData} />}

        {/* Empty State */}
        {!weatherData && !loading && !error && (
          <div className="empty-state">
            <span>🌍</span>
            <p>Search for a city to see weather data</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
