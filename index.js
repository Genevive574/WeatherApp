const apiKey = 'f40f6bc477e5fcda6e83f1ef8970c7b0'
const weatherDisplay = document.getElementById('weather-display')
const getWeatherBtn = document.getElementById('get-weather-btn')
const cityInput = document.getElementById('city-input')

getWeatherBtn.addEventListener('click', () =>{
    const city = cityInput.value;
    if(
        city){
            fetchweatherData(city);
        } else{
            alert('Please enter a city name');
        }
})

function fetchweatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
     .then(response => response.json())
     .then(data => {
        if(data.cod === 200){
            displayWeather(data);
        } else {
            weatherDisplay.innerHTML = '<p>City not found.</p>';
        }
      })
      .catch( error => {
        console.error('Error fetching weather data:', error);
        weatherDisplay.innerHTML = '<p>Error fetching data. Please try again.</p>';
      });
}     

function displayWeather(data){
    const { name, timezone, main: {temp, pressure}, weather: [{description}] }= data;

    weatherDisplay.innerHTML = `
    <p>City: ${name}</p>
    <p>Temperature: ${temp}°C</p>
    <p>Description: ${description}</p>
    <p>Pressure: ${pressure} hPa</p>
    <p>Time Zone: ${timezone} hours</p>
    `
}