import React, { useEffect, useState } from "react";
import Search from "../Search/Search";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = () => {
    fetchWeatherData(search);
    setSearch("");
  };

  const fetchWeatherData = async (param) => {
    try {
      setloading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid= use your own key here`
      );
      // check out this url for Api key = https://openweathermap.org/api
      const result = await response.json();

      setWeatherData(result);
      setloading(false);

      console.log(result);
    } catch (error) {
      setError(error.message);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("bangalore");
  }, []);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  console.log(weatherData);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>{" "}
            </h2>{" "}
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{weatherData?.main?.temp}</div>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
