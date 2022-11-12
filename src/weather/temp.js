//https://api.openweathermap.org/data/2.5/weather?q=ahmedabad&appid=40259c77a7c47a31f76f9db6f85bad88

import React, { useEffect, useState } from "react";

import Weathercard from "./weathercard";

function Temp() {
  const [searchValue, setSearchValue] = useState("ahmedabad");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric
        &appid=40259c77a7c47a31f76f9db6f85bad88`;
      const res = await fetch(url);
      const data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            search
          </button>
        </div>
      </div>
      <Weathercard tempInfo={tempInfo} />
    </div>
  );
}

export default Temp;
