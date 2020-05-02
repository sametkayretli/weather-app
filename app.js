window.addEventListener("load", ()=>{
  let lat,
      lon,
      locationWeather               = document.querySelector("#location"),
      currentTemp                   = document.querySelector("#temp"),
      sunriseTime                   = document.querySelector("#sunrise"),
      sunsetTime                    = document.querySelector("#sunset"),
      populationZone                = document.querySelector("#population"),
      weatherDescript               = document.querySelector("#description"),
      windSpeed                     = document.querySelector("#wind"),
      pressureZone                  = document.querySelector("#pressure"),
      s1                            = document.querySelector("#s1"),
      d1                            = document.querySelector("#d1"),
      s2                            = document.querySelector("#s2"),
      d2                            = document.querySelector("#d2"),
      s3                            = document.querySelector("#s3"),
      d3                            = document.querySelector("#d3"),
      s4                            = document.querySelector("#s4"),
      d4                            = document.querySelector("#d4"),
      s5                            = document.querySelector("#s5"),
      d5                            = document.querySelector("#d5"),
      s6                            = document.querySelector("#s6"),
      d6                            = document.querySelector("#d6"),
      s7                            = document.querySelector("#s7"),
      d7                            = document.querySelector("#d7"),
      s8                            = document.querySelector("#s8"),
      d8                            = document.querySelector("#d8"),
      i0                            = document.querySelector("#weather-icon"),
      i1                            = document.querySelector("#i1"),
      i2                            = document.querySelector("#i2"),
      i3                            = document.querySelector("#i3"),
      i4                            = document.querySelector("#i4"),
      i5                            = document.querySelector("#i5"),
      i6                            = document.querySelector("#i6"),
      i7                            = document.querySelector("#i7"),
      i8                            = document.querySelector("#i8"),
      time                          = document.querySelector("#time"),
      date                          = document.querySelector("#date"),
      humidityZone                  = document.querySelector("#humidity");

      function showTime(){
         let today = new Date(),
             day   = today.toLocaleDateString("tr-TR");
             hour  = today.getHours(),
             min   = today.getMinutes(),
             sec   = today.getSeconds();
             time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
             date.innerHTML = `${day}`;

             setTimeout(showTime, 1000);
      }
          
          // Add Zeros
      function addZero(n){
             return(parseInt(n, 10) < 10 ? "0" : "") + n;
      }

   showTime();

  if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(position =>{
        console.log(position);
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=tr&units=metric&appid=d3eb365e2341d609287a71a178ff2e87`
        const apiCurrent= `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=tr&units=metric&appid=d3eb365e2341d609287a71a178ff2e87`
        
        fetch(apiCurrent)
            .then(res =>{
               return res.json();
            })
            .then(currentData =>{
               locationWeather.textContent = currentData.name.toUpperCase();
               currentTemp.textContent = Math.round(currentData.main.temp) + "°C";
               sunriseTime.textContent = new Date(currentData.sys.sunrise *1000).toLocaleTimeString("tr-TR").slice(0,5);
               sunsetTime.textContent = new Date(currentData.sys.sunset *1000).toLocaleTimeString("tr-TR").slice(0,5);
               weatherDescript.textContent = currentData.weather[0].description;
               humidityZone.textContent = " " + currentData.main.humidity +"%";
               pressureZone.textContent = " " + currentData.main.pressure + " Pa";
               windSpeed.textContent = " "+ currentData.wind.speed + " m/s , " + currentData.wind.deg +"°";
               i0.innerHTML = '<img src="./icons/'+ currentData.weather[0].icon + '.svg" style="width: 90%">'
            })            

        fetch(api)
            .then(response =>{
               return response.json();
            })
            .then(data =>{
               populationZone.textContent = " " +data.city.population;
               s1.textContent = new Date(data.list[0].dt*1000).toLocaleTimeString("tr-TR").slice(0,5);
               d1.textContent = Math.round(data.list[0].main.temp) + "°C";
               s2.textContent = new Date(data.list[1].dt*1000).toLocaleTimeString("tr-TR").slice(0,5);
               d2.textContent = Math.round(data.list[1].main.temp) + "°C";
               s3.textContent = new Date(data.list[2].dt*1000).toLocaleTimeString("tr-TR").slice(0,5);
               d3.textContent = Math.round(data.list[2].main.temp) + "°C";      
               s4.textContent = new Date(data.list[3].dt*1000).toLocaleTimeString("tr-TR").slice(0,5);
               d4.textContent = Math.round(data.list[3].main.temp) + "°C";
               s5.textContent = new Date(data.list[4].dt*1000).toLocaleTimeString("tr-TR").slice(0,5);
               d5.textContent = Math.round(data.list[4].main.temp) + "°C";
               s6.textContent = new Date(data.list[5].dt*1000).toLocaleTimeString("tr-TR").slice(0,5);
               d6.textContent = Math.round(data.list[5].main.temp) + "°C";
               s7.textContent = new Date(data.list[6].dt*1000).toLocaleTimeString("tr-TR").slice(0,5);
               d7.textContent = Math.round(data.list[6].main.temp) + "°C";
               s8.textContent = new Date(data.list[7].dt*1000).toLocaleTimeString("tr-TR").slice(0,5);
               d8.textContent = Math.round(data.list[7].main.temp) + "°C";
               i1.innerHTML   = '<img src="./icons/'+ data.list[0].weather[0].icon + '.svg">'
               i2.innerHTML   = '<img src="./icons/'+ data.list[1].weather[0].icon + '.svg">'
               i3.innerHTML   = '<img src="./icons/'+ data.list[2].weather[0].icon + '.svg">'
               i4.innerHTML   = '<img src="./icons/'+ data.list[3].weather[0].icon + '.svg">'
               i5.innerHTML   = '<img src="./icons/'+ data.list[4].weather[0].icon + '.svg">'
               i6.innerHTML   = '<img src="./icons/'+ data.list[5].weather[0].icon + '.svg">'
               i7.innerHTML   = '<img src="./icons/'+ data.list[6].weather[0].icon + '.svg">'
               i8.innerHTML   = '<img src="./icons/'+ data.list[7].weather[0].icon + '.svg">'                             
               
            });
     });
  }

});
