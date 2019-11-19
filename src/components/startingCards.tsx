import React from 'react';
import iconImage from '../utils/iconImage';

interface Props {
  currentWeather: any
  temp: string
}
export default function StartingCard(props: Props) {
  return (
    <div className="weather-wrapper2">
      <div className="weather-card madrid">
        <div className="temperature">
          <div className="weatherIcon" id="fiveDayIcon"><i className={iconImage(props.currentWeather.weather[0].main)}></i></div>
        </div>
        <h1>{props.temp === "c" ? (props.currentWeather.main.temp - 273.15).toFixed(0) : (((props.currentWeather.main.temp - 273.15) * 1.8) + 32).toFixed(0)}  <span className={props.temp === "c" ? "wi wi-celsius" : "wi wi-fahrenheit"}></span></h1>
        <div className="cityName"> <p>{props.currentWeather.name}</p></div>

      </div>
    </div>
  );
}
