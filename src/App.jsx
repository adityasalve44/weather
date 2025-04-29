import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import SearchPage from "./components/SearchPage";
import { fetchWeather } from "../services/weather";
import "./index.css";

function App() {
  const [unit, setUnit] = useState("c");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const updateWeatherData = useCallback(async (location) => {
    try {
      const data = await fetchWeather(location);
      setWeatherData(data);
      setError("");
    } catch (err) {
      setError(err.message);
      throw err; // rethrow so SearchPage can catch it
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateWeatherData(`${latitude},${longitude}`);
        },
        () => {
          updateWeatherData("Pune");
        }
      );
    } else {
      updateWeatherData("Pune");
    }
  }, [updateWeatherData]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-container">
              <div className="header">
                <Link to="/search" className="search-button">
                  Search City
                </Link>
                <button
                  onClick={() => setUnit(unit === "c" ? "f" : "c")}
                  className="unit-toggle"
                >
                  °{unit.toUpperCase()}
                </button>
              </div>

              {!weatherData && !error && <p className="loading">Loading...</p>}

              <CurrentWeather
                data={weatherData?.current}
                location={weatherData?.location}
                unit={unit}
              />

              <HourlyForecast
                hours={weatherData?.forecast?.forecastday[0]?.hour}
                unit={unit}
              />

              <DailyForecast
                days={weatherData?.forecast?.forecastday}
                unit={unit}
              />
            </div>
          }
        />
        <Route
          path="/search"
          element={<SearchPage onSearch={updateWeatherData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
