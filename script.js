const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = 'bdc57a5019e8c1ca65dbf084227470d7';


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat <10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes<10 ?'0'+ minutes:minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ',' + date + ' ' + months[month]

}, 1000)
getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}
function showWeatherData(data) {
    let { humidity, pressure } = data.list[0].main;
    let{sunrise,sunset}=data.city;
    let{speed}=data.list[0].wind;
    timezone.innerHTML = data.city.name; // or use a proper format if needed
countryEl.innerHTML = data.city.country;

currentWeatherItemsEl.innerHTML = 

    `<div class="weather-item">
                    <div class="item1"><div> <i class="fas fa-tint icon"></i>Humidity</div>
                    <div>${humidity}</div>
                </div>
                </div>
                <div class="weather-item">
                    <div class="item2"><div><i class="fas fa-gauge icon"></i>pressure</div>
                    <div>${pressure}</div>
                </div></div>
                <div class="weather-item">
                    <div class="item3"><div><i class="fas fa-wind icon"></i>wind speed</div>
                    <div>${speed}</div>
                </div></div>
                <div class="weather-item">
                    <div class="item4"><div><i class="fas fa-sun icon"></i> sunrise</div>
                    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
                </div></div>
                <div class="weather-item">
                    <div class="item5"><div><i class="fas fa-moon icon"></i>sunset</div>
                    
                    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
                </div></div>
                  `;
                  let otherDayForcast = ''
    data.list.forEach((time, idx) => {
        if (idx == 0) {
currentTempEl.innerHTML =`
<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="others">
                <div class="day">${window.moment(time.dt* 1000).format('HH:mm')}</div>
                <div class="temp">${time.main.temp_max}&#176; C </div>
                <div class="temp">${time.main.temp_min}&#176; C </div>
            </div>


`
        } else if(idx<7) {
            otherDayForcast += `
              <div class="weather-forecast-item">
                <div class="day"> ${window.moment(time.dt* 1000).format('HH:mm')} </div>
              
                <img src=" https://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png" alt="Weather-Icon" class="w-icon">

                <div class="temperature">${time.main.temp_max}&#176; C </div>
                <div class="temperature"> ${time.main.temp_min}&#176; C </div>
            </div>

        </div>
        
            `

        }else{}
    })
    weatherForecastEl.innerHTML = otherDayForcast;
}
