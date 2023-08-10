const inputBox=document.querySelector('.input_box');
const searchBtn=document.getElementById('btn');
const weather_img=document.querySelector('.weather-image');
const temperature=document.querySelector('.temp');
const description=document.querySelector('.description');
const humidity=document.getElementById('humidity');
const wind_speed=document.getElementById('wind_speed');

const error = document.querySelector('.error'); 
const weather=document.querySelector('.weather');

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// de6de20377f5f37b2d9ba167dbace76a

async function checkWeather(city){
    const api_key="de6de20377f5f37b2d9ba167dbace76a";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data= await fetch(`${url}`).then(response=> response.json());
    if(weather_data.cod ===`404`){
        error.style.display="block";
        weather.style.display="none"
        return;
    }

    weather.style.display="flex"
    error.style.display="none";
    temperature.innerHTML=`${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind_speed.innerHTML=`${weather_data.wind.speed}Km/h`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src="./images/clouds.png";
            break;
        case 'Clear':
            weather_img.src="./images/clear.png";
            break;
        case 'Rain':
            weather_img.src="./images/rain.png";
            break;
        case 'Mist':
            weather_img.src="./images/mist.png";
            break;
        case 'Snow':
            weather_img.src="./images/snow.png";
            break;
        
    }
}


searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
});

inputBox.addEventListener('keyup',(e)=>{
    if(e.keyCode === 13){
checkWeather(inputBox.value);
    }
})