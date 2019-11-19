

import React from 'react';
import iconImage from '../utils/iconImage';

interface Props {
  currentWeather: any
  temp: string
}
export default function CurrentWeatherDisplay(props: Props) {
  return (
    <article className="widget">
      <div className="weatherIcon"><i className={iconImage(props.currentWeather.weather[0].main)}></i></div>
      <div className="weatherInfo1">
        <div className="temperature">
          <span>{props.temp === "c" ? (props.currentWeather.main.temp - 273.15).toFixed(0) : (((props.currentWeather.main.temp - 273.15) * 1.8) + 32).toFixed(0)}
            <span className={props.temp === "c" ? "wi wi-celsius" : "wi wi-fahrenheit"}></span></span>
        </div>
        <div className="description">
          <div className="weatherCondition">{props.currentWeather.weather[0].description}</div>
          <div className="place">{props.currentWeather.name}, {props.currentWeather.sys.country} </div>
        </div>
      </div>
      <div className="date1">Rain: {props.currentWeather.rain ? props.currentWeather.rain["1h"] : 0} mm</div>
      <div className="weatherInfo1">
        <div className="temperature"><i className="wi wi-sunrise"></i></div>
        <div className="description">
          <div className="weatherCondition">Sunrise</div>
        </div>
      </div>
      <div className="date1">{new Date(props.currentWeather.sys.sunrise * 1000).toLocaleTimeString()}</div>
      <div className="weatherInfo">
        <div className="temperature"><i className="wi wi-sunset"></i></div>
        <div className="description">
          <div className="weatherCondition">Sunset</div>
        </div>
      </div>
      <div className="date">{new Date(props.currentWeather.sys.sunset * 1000).toLocaleTimeString()}</div>
    </article>
  );
}




