import React from 'react';
import { weatherClient } from "../utils/weatherClient"
import backgroundImage from '../utils/backgroundImage';
import PrimarySearchAppBar from './searchBar';
import CurrentWeatherDisplay from './currentWeatherDisplay';
import FiveDayCard from './fiveDayCard';
import { city_names } from '../utils/cities';
import StartingCard from './startingCards';

export default class HomePage extends React.Component {
  public state = {
    city: "",
    error: "",
    errorHeight: "",
    view: "search",
    search: "",
    backgroundImage: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/1-sun-and-clouds-macroworld.jpg',
    currentweather: "",
    currentView: "",
    tempType: "c",
    result: false,
    fiveDays: [],
    apiKey: "a53a8a419f8c79db219002f5a60e64dc",
    starterCities: [],
    ready: false,
  };
  // set city name as entered into search bar
  setCity = (e: React.SyntheticEvent): void => {
    let cityName = e.target as HTMLInputElement;
    this.setState({ city: cityName.value, search: cityName.value })
    e.preventDefault()
  }

  // toggle view betweem current weather and 5 day
  setCurrentView = (viewType: string) => {
    this.setState({ currentView: viewType });
  }
  // set state between F or C
  setTemp = (type: string) => {
    this.setState({ tempType: type });
  }

  // submit city search and preform api calls
  submitCity = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()
    if (this.state.city.length < 1) {
      this.setState({ error: "City name must be at least one letter", errorHeight: "5%" })
      setTimeout(() => {
        this.setState({ error: "", errorHeight: "" })
      }, 5000)
      return
    }
    let city;
    let country;


    // properly divide city and country, checking if country was supplied

    const cityCountry = this.state.city.split(",")
    if (cityCountry.length > 1) {
      city = cityCountry[0];
      country = cityCountry[1].replace(/\s/g, '');
    } else {
      city = cityCountry[0];
    }

    const url = country ?
      `${city},${country}&APPID=${this.state.apiKey}`
      :
      `${city}&APPID=${this.state.apiKey}`

    try {
      const weather = await weatherClient.get(`weather?q=${url}`)
      // set state with city weather
      this.setState({ view: weather.data.weather[0].main, currentweather: weather.data, result: true, currentView: "currentWeather" })

      // change background to match city weather
      const background = await backgroundImage(this.state.view)
      this.setState({ backgroundImage: background, search: "" })

      // get 5 day forecast

      const hourly = await weatherClient.get(`forecast?q=${url}&mode=json&APPID`)
      const fiveDays = [];

      // set 5 day forecast
      fiveDays.push(hourly.data.list[3], hourly.data.list[11], hourly.data.list[19], hourly.data.list[27], hourly.data.list[35])
      this.setState({ fiveDays })

    } catch (error) {
      this.setState({ error: "Sorry, we can not find weather information for this city. Please change your search and try again", errorHeight: "5%" })
      setTimeout(() => {
        this.setState({ error: "", errorHeight: "" })
      }, 5000)
      return
    }
  }
  startCitys = () => {
    const cities = []
    for (let i = 0; i < 12; i++) {
      cities.push(city_names[Math.random() * city_names.length | 10])

    }
    return cities
  }

  componentDidMount = async () => {
    const cities = this.startCitys()
    const selectedCities: any = []
    cities.forEach(async (c) => {
      try {
        const url = `${c}&APPID=${this.state.apiKey}`
        const weather = await weatherClient.get(`weather?q=${url}`)
        selectedCities.push(weather.data)
      } catch (error) {
        return
      }
      this.setState({ starterCities: selectedCities, ready: true })
    })
  }


  displayData = () => {
    // danamically set background based on weather condition of city
    const backgroundImage = { backgroundImage: `url(${this.state.backgroundImage})` }
    //create 5 day cards
    const fiveDays: any = this.state.fiveDays.map((f: any) => {
      return <FiveDayCard currentWeather={f} temp={this.state.tempType} key={f.main.temp} />
    })

    const cities: any = this.state.starterCities.map((f: any) => {
      return <StartingCard currentWeather={f} temp={this.state.tempType} key={f.main.temp} />
    })
    const display = this.state.view === "search" ?
      <div >
        <PrimarySearchAppBar
          setCity={this.setCity}
          error={this.state.error}
          submitCity={this.submitCity}
          results={this.state.result}
          currentView={this.setCurrentView}
          search={this.state.search}
          temp={this.setTemp} />
        <div className="error" style={{ height: this.state.errorHeight }}>{this.state.error}</div>
        <div className="mainBody" style={backgroundImage}>
          {cities}
        </div>
      </div>
      :
      this.state.currentView === "currentWeather" ?
        <div  >
          <PrimarySearchAppBar
            setCity={this.setCity}
            error={this.state.error}
            submitCity={this.submitCity}
            results={this.state.result}
            currentView={this.setCurrentView}
            search={this.state.search}
            temp={this.setTemp} />
          <div className="mainBody" style={backgroundImage} ></div >
          <div className="error" style={{ height: this.state.errorHeight }}>{this.state.error}</div>
          <CurrentWeatherDisplay currentWeather={this.state.currentweather} temp={this.state.tempType} />
        </div>
        :
        <div>
          <PrimarySearchAppBar
            setCity={this.setCity}
            error={this.state.error}
            submitCity={this.submitCity}
            results={this.state.result}
            currentView={this.setCurrentView}
            search={this.state.search}
            temp={this.setTemp} />
          <div className="error" style={{ height: this.state.errorHeight }}>{this.state.error}</div>
          <div className="mainBody" style={backgroundImage} >
            {fiveDays}
          </div >

        </div>
    return display
  }

  render() {
    const display: any = this.state.ready ? this.displayData() : <h1>loading...</h1>
    return (
      <div>
        {display}
      </div>
    );
  }
}