const button = document.getElementById('button');
let search = document.getElementById('search');
let previous = document.getElementById('previous');
let todayReport = document.getElementById('report');
let forecast = document.getElementById('5day');





function next() {
    // Will either run API fetch or process API fetch to display forecast info.
}

function start() {
    // Take value from searchbar, then store inside local storage to be display inside previous then finally clear search bar to be reused. 
    // If possible will run API fetch inside this.
    // Trigger next function
    next();
}

button.addEventListener('click', start);