let button = document.querySelector('.btn');
let search = document.getElementById('search');
let previous = document.getElementById('previous');
let forecast = document.getElementById('5day');
let APIKey = '9cdba493e0bb8dba4b2bc9025e8cbd61';
let searchHistory = [];
let weatherReport = [];
let searchAttempts = 0;

function displayWeather() {
    /* Goal: Display information about weather report */

    //jumbo
    let img = document.getElementById('img');
    img.src = `http://openweathermap.org/img/wn/${weatherReport[0].icons}@2x.png`

    let jumbotron = document.getElementById('jumbotron');
    jumbotron.innerHTML = 'Date: ' + weatherReport[0].date;

    let jumboTemp = document.getElementById('jumboTemp');
    jumboTemp.innerHTML = 'Temp: ' + weatherReport[0].temp + '°F';

    let jumboWind = document.getElementById('jumboWind');
    jumboWind.innerHTML = 'Wind: ' + weatherReport[0].wind + 'mph';

    let jumboHumid = document.getElementById('jumboHumid');
    jumboHumid.innerHTML = 'Humidity: ' + weatherReport[0].humidity + '%';

    //cards
    let cards = document.getElementById('cards');
    for (let x = 0; x < 5; x++) {
        let img = cards.children[x].children[0].children[0];
        img.src = `http://openweathermap.org/img/wn/${weatherReport[x].icons}@2x.png`;

        let day = cards.children[x].children[0].children[1];
        day.innerHTML = 'Date: ' + weatherReport[x].date;

        let temp = cards.children[x].children[0].children[2];
        temp.innerHTML = 'Temp: ' + weatherReport[x].temp + '°F';

        let wind = cards.children[x].children[0].children[3];
        wind.innerHTML = 'Wind: ' + weatherReport[x].wind + 'mph';

        let humid = cards.children[x].children[0].children[4];
        humid.innerHTML = 'Humidity: ' + weatherReport[x].humidity + '%';
    }

    //list
    let list = document.getElementById('list');
    for (let x = 0; x < searchHistory.length; x++) {
        let city = list.children[x];
        city.innerHTML = searchHistory[x];
    }

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
            console.log(data);
            //incremental jump
            weatherReport = [];
            for (let x = 0; x <= 32; x += 8) {
                let day = dayjs(data.list[x].dt * 1000).format('MM-DD');
                console.log(data.list[x].dt);
                console.log(day);
                weatherReport.push(
                    {
                        icons: data.list[x].weather[0].icon,
                        date: day,
                        weather: data.list[x].weather[0].main,
                        temp: data.list[x].main.temp,
                        humidity: data.list[x].main.humidity,
                        wind: data.list[x].wind.speed
                    }
                );
            };
            console.log(weatherReport);
            displayWeather();
        });
}

function latlonLocator(city) {
    /* Goal : To get lat and lon for second api fetch at the same time update the searchHistory arr to store recently searched cities
    for quick access. */

    // local storage search values
    localStorage.setItem('city', search.value);

    // set history
    let history = localStorage.getItem('city')
    if (!searchHistory.includes(history))
    {
        searchHistory.push(history);
    }

    //first API fetch to find lat/lon
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

button.addEventListener('click', function() {
    let city = search.value;
    latlonLocator(city);
});

list.addEventListener('click', function(event) {
    let city = event.target.textContent;
    latlonLocator(city);
})