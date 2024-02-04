const cityInput = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')

const cityName = document.getElementById('city-name')
const tempDiv = document.getElementById('img-temp') 
const icon = document.getElementById('icon')
const temperature = document.getElementById('temperature')
const infoDiv = document.getElementById('info')
const description = document.getElementById('description')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')

const apiKey = "418082270a39edd2b448b92f029bcdb3"

const loaderSetOff = () =>{
  const loaderOff = document.getElementById('loader').style.display = "none"
  
  return loaderOff
}

const loaderSetOn = () =>{
  const loaderOn = document.getElementById('loader').style.display = "block"

  return loaderOn
}

const getWeather = async function(city){
  const apiCity = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
  const cityResponse = await apiCity.json()

  const apiWeather = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${cityResponse[0].lat}&lon=${cityResponse[0].lon}&exclude=minutely,hourly,daily&units=metric&lang=pt_br&appid=${apiKey}`)
  const weatherResponse = await apiWeather.json()

  return [cityResponse, weatherResponse]
}

const defaultWeather = async function(){
  loaderSetOn()

  const [cityResponse, weatherResponse] = await getWeather("Rio de Janeiro")
  
  cityName.innerText = `${cityResponse[0].name}`
  icon.setAttribute('src', `https://openweathermap.org/img/wn/${weatherResponse.current.weather[0].icon}@2x.png`)
  temperature.innerText = `${Math.trunc(weatherResponse.current.temp)}ºC`
  description.innerText = `${weatherResponse.current.weather[0].description}`
  humidity.innerText = `Humidade: ${weatherResponse.current.humidity}%`
  wind.innerText = `Vento: ${weatherResponse.current.wind_speed} Km/h`

  loaderSetOff()
}

const showWeather = async function(city){
  loaderSetOn()

  const [cityResponse, weatherResponse] = await getWeather(city)

  cityName.innerText = `${cityResponse[0].name}`
  icon.setAttribute('src', `https://openweathermap.org/img/wn/${weatherResponse.current.weather[0].icon}@2x.png`)
  temperature.innerText = `${Math.trunc(weatherResponse.current.temp)}ºC`
  description.innerText = `${weatherResponse.current.weather[0].description}`
  humidity.innerText = `Humidade: ${weatherResponse.current.humidity}%`
  wind.innerText = `Vento: ${weatherResponse.current.wind_speed} Km/h`

  loaderSetOff()
}

searchBtn.addEventListener('click', (e) =>{
  e.preventDefault()

  const city = cityInput.value

  showWeather(city)
})

cityInput.addEventListener('keyup', (e) =>{
  if (e.code === "Enter") {
    const city = e.target.value

    showWeather(city)
  }
})

loaderSetOff()

defaultWeather()
