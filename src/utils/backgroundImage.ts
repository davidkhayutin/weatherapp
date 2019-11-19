export default function backgroundImage(description: string){
    switch(description){
        case "Clouds": { 
          return "https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg?size=626&ext=jpg"
        } 
        case "Clear": { 
            return 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/1-sun-and-clouds-macroworld.jpg' 
          } 
        case "Thunderstorm": { 
            return "https://i.pinimg.com/originals/7e/fb/1e/7efb1e6d25184aac0998fb966732325d.jpg"
        } 
        case "Snow": { 
        return "https://downloops.com/wp-content/uploads/edd/2016/11/GlitteringSnowBlueBG-Snow_And_Christmas_Motion_Background_Video_Loop_SampleStill.jpg"
        } 
        case "Drizzle": { 
          return "https://www.freevector.com/uploads/vector/preview/7040/FreeVector-Rain-Background.jpg" 
        } 
        case "Rain": { 
            return "https://www.freevector.com/uploads/vector/preview/7040/FreeVector-Rain-Background.jpg" 
        } 
        case "moderate rain": { 
            return "https://www.freevector.com/uploads/vector/preview/7040/FreeVector-Rain-Background.jpg" 
        } 
        case "Mist": { 
            return "https://www.freevector.com/uploads/vector/preview/7040/FreeVector-Rain-Background.jpg" 
        } 
        default: {
         return 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/1-sun-and-clouds-macroworld.jpg' 
        }
      }
}
