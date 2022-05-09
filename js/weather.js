const retryForm = document.querySelector('#retry-form')
let weather = ''
let WeatherAndFood = ''

function readJSON(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}

function setWeatherAndFood(weather) {
  const weather1 = document.querySelector('#weather1')
  const weather2 = document.querySelector('#weather2')
  const menu = document.querySelector('#menu')
  const menuImg = document.querySelector('#menu-img')
  switch (weather) {
    case 'rain':
      weather1.innerText = '비'
      weather2.innerText = '비오는'
      break
    case 'snow':
      weather1.innerText = '눈'
      weather2.innerText = '눈오는'
      break
    case 'clear':
      weather1.innerText = '맑음'
      weather2.innerText = '맑은'
      break
    case 'clouds':
      weather1.innerText = '구름'
      weather2.innerText = '흐린'
      break
  }
  const randomMenu = _.sample(WeatherAndFood[weather])
  menu.innerText = randomMenu.name
  menuImg.src = randomMenu.url
}

function getWeather(weatherID) {
  if (weatherID === 771 || weatherID === 781) {
    return 'rain'
  } else if (weatherID === 800) {
    return 'clear'
  } else {
    switch (Math.floor(weatherID/100)) {
      case 2:
      case 3:
      case 5:
        return 'rain'
      case 6:
        return 'snow'
      case 7:
      case 8:
        return 'clouds'
    }
  }
}

// 위도와 경도 이용하여 날씨 API로 현재 날씨(ID) 받아오기
const API_KEY = 'c382e4c6aed3e8668a7ac92ea59e7b30'
function onGeoOk(position){
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      weather = getWeather(data.weather[0].id)
      readJSON("./WeatherAndFood.json", (text) => {
        WeatherAndFood = JSON.parse(text)
        setWeatherAndFood(weather)
      })
    })
}

navigator.geolocation.getCurrentPosition(onGeoOk, () => {
  alert("Can't find you. No weather for you.")
})

retryForm.addEventListener('submit', (event)=> {
  event.preventDefault()
  setWeatherAndFood(weather)
})