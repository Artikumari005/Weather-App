document.getElementById('startBtn').addEventListener('click', function(){
    document.getElementById('weatherCheck').style.display='block';
    document.querySelector('.main-container').style.display='none';
});

//weather api logic
const apiKey='8653be4f0cd26c165855460989ab20c2';
document.getElementById('searchBtn').addEventListener('click',function(){
    const city=document.getElementById('cityInput').value.trim();
    if(city===''){
        alert('Please enter your city name');
        return;
    }
    getWeather(city);
});
function getWeather(city){
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
    .then(response =>{
        
        if(!response.ok){
            throw new error('city not found');
        }
    return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error =>{
        document.getElementById('weatherResult').innerHTML=`<p class="error">${error.message}</p>`;

    });
}

//fetch weather by geolocation
function showWeatherByLocation(position){
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;

    const apiURL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(apiURL)
    .then(response=>response.json())
    .then(data => displayWeather(data))
    .catch(error =>{
        document.getElementById('weatherResult').innerHTML=`<p class="error">Unable to fetch weather by location.</p>`;

    });
}

//error handling for geolocation
function showLocationError(){
    alert('LOcation access denied or not available.');
}

//display weather details

function displayWeather(data){
    document.getElementById('cityName').innerHTML=`${data.name},${data.sys.country}`;
    document.getElementById('temperature').innerText=`🌡️Temperature:${data.main.temp} °C`;
    document.getElementById('condition').innerText = `⛅ Condition: ${data.weather[0].main}`;
  document.getElementById('humidity').innerText = `💧 Humidity: ${data.main.humidity}%`;
  document.getElementById('wind').innerText = `🌬️ Wind: ${data.wind.speed} m/s`;
}