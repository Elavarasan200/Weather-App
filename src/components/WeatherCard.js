import React from 'react';

function getWeatherEmoji(code) {
  if (code >= 200 && code < 300) return '⛈️';
  if (code >= 300 && code < 400) return '🌦️';
  if (code >= 500 && code < 600) return '🌧️';
  if (code >= 600 && code < 700) return '❄️';
  if (code >= 700 && code < 800) return '🌫️';
  if (code === 800) return '☀️';
  if (code === 801) return '🌤️';
  if (code >= 802) return '☁️';
  return '🌡️';
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'short', day: 'numeric',
    month: 'short', year: 'numeric'
  });
}

function WeatherCard({ data }) {
  const emoji = getWeatherEmoji(data.weather[0].id);
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const tempMin = Math.round(data.main.temp_min);
  const tempMax = Math.round(data.main.temp_max);
  const windKmh = Math.round(data.wind.speed * 3.6);
  const visibilityKm = data.visibility
    ? (data.visibility / 1000).toFixed(1)
    : 'N/A';

  return (
    <div className="weather-card">

      {/* City & Date */}
      <div className="city-row">
        <div>
          <h2 className="city-name">{data.name}</h2>
          <span className="country-badge">{data.sys.country}</span>
        </div>
        <p className="date-text">{formatDate()}</p>
      </div>

      {/* Temperature */}
      <div className="temp-row">
        <span className="weather-icon">{emoji}</span>
        <div>
          <p className="temp-value">
            {temp}<span className="temp-unit">°C</span>
          </p>
          <p className="weather-desc">{data.weather[0].description}</p>
        </div>
      </div>

      {/* Feels Like / Min / Max */}
      <div className="chips-row">
        <span className="chip">Feels like <strong>{feelsLike}°C</strong></span>
        <span className="chip">Min <strong>{tempMin}°C</strong></span>
        <span className="chip">Max <strong>{tempMax}°C</strong></span>
      </div>

      <hr className="divider" />

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>💧</span>
          <p className="stat-label">Humidity</p>
          <p className="stat-value">{data.main.humidity}%</p>
        </div>
        <div className="stat-card">
          <span>🌬️</span>
          <p className="stat-label">Wind</p>
          <p className="stat-value">{windKmh} km/h</p>
        </div>
        <div className="stat-card">
          <span>🔭</span>
          <p className="stat-label">Visibility</p>
          <p className="stat-value">{visibilityKm} km</p>
        </div>
        <div className="stat-card">
          <span>📊</span>
          <p className="stat-label">Pressure</p>
          <p className="stat-value">{data.main.pressure} hPa</p>
        </div>
      </div>

    </div>
  );
}

export default WeatherCard;