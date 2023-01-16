let button = document.querySelector('.btn');
let search = document.getElementById('search');
let previous = document.getElementById('previous');
let forecast = document.getElementById('5day');
let APIKey = '9cdba493e0bb8dba4b2bc9025e8cbd61';
let searchHistory = [];
let weatherReport = [];



function displayWeather() {
    /* Goal: Display information about weather report */



    console.log(weatherReport.temp)



    let jumbotron = document.getElementById('jumbotron');
    jumbotron.textContent = weatherReport[1].date;

    let jumboTemp = document.getElementById('jumboTemp');
    jumboTemp.textContent = 'Temp: ' + weatherReport[1].temp;

    let jumboWind = document.getElementById('jumboWind');
    jumboWind.textContent = 'Wind: ' + weatherReport[1].wind;

    let jumboHumid = document.getElementById('jumboHumid');
    jumboHumid.textContent = 'Humidity: ' + weatherReport[1].humidity;
}


function weatherPull(lat, lon) {
    /* Goal: Find weather info and icons if possible. 
    Need to implement an incremental jump to skim through the list to find only 12PM info*/

    //second api to find weather info
    let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
    fetch(weatherURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //incremental jump, need to change this tester into using 12PM only. Might need to use UNIX
            for (let x = 0; x <= 32; x += 8) {
                console.log(data.list[x]);

                //obj array of weather report, need to fix
                let weatherReport = JSON.parse(localStorage.getItem('weather')) || [];
                weatherReport.push(
                    {
                        date: data.list[x].dt_txt,
                        weather: data.list[x].weather[0].main,
                        temp: data.list[x].main.temp,
                        humidity: data.list[x].main.humidity,
                        wind: data.list[x].wind.speed
                    }
                );
                localStorage.setItem('weather', JSON.stringify(weatherReport));
            };
        });
        displayWeather();
}

function latlonLocator() {
    /* Goal : To get lat and lon for second api fetch at the same time update the searchHistory arr to store recently searched cities
    for quick access. */

    //local storage search values
    localStorage.setItem('city', search.value);

    // set history
    searchHistory.push = localStorage.getItem('city') || [];
    // console.log(searchHistory);

    //first API fetch to find lat/lon
    let city = localStorage.getItem('city');
    let latlonURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
    fetch(latlonURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
        weatherPull(data[0].lat, data[0].lon);
    })
}


button.addEventListener('click', latlonLocator);