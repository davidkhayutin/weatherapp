export default function iconImage(description: string) {
  switch (description) {
    case "Clouds": {
      return "wi wi-cloudy"
    }
    case "Clear": {
      return "wi wi-day-sunny"
    }
    case "Thunderstorm": {
      return "wi wi-day-thunderstorm"
    }
    case "Snow": {
      return "wi wi-day-snow"
    }
    case "Drizzle": {
      return "wi wi-day-sprinkle"
    }
    case "Rain": {
      return "wi wi-day-showers"
    }
    case "moderate rain": {
      return "wi wi-day-showers"
    }
    case "Mist": {
      return "wi wi-day-fog"
    }
    default: {
      return 'wi wi-day-cloudy'
    }
  }
}
