const button = document.getElementById('button');
let search = document.getElementById('search');
let previous = document.getElementById('previous');
let forecast = document.getElementById('5day');
let reqUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=Minneapolis&appid=9cdba493e0bb8dba4b2bc9025e8cbd61'
// function next() {
//     // Will either run API fetch or process API fetch to display forecast info. might not need this function.
// }
fetch(reqUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        start(data[0].lat, data[0].lon)
    })

function start(lat, lon) {
    //might move API fetch into next so I can have everything logged here with values to input inside the lat/lon boxes. 
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9cdba493e0bb8dba4b2bc9025e8cbd61&units=imperial`
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
        });
    // Take value from searchbar, then store inside local storage to be display inside previous then finally clear search bar to be reused. 
    // Trigger next function

    localStorage.setItem('city', search.value);




    // next();
}

button.addEventListener('click', start);