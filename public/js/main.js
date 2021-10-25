const cityName = document.getElementById('cityname');
const submitBtn = document.getElementById('search-button');
const temp = document.getElementById('main-temp');
const place = document.getElementById('place');
const tmp_status = document.getElementById('temp-status');
const main_temp = document.getElementById('main-temp');
const week = document.getElementById('week');
const date = document.getElementById('date');

let currentTime = new Date();
const getCurrentDay = () => {
    let weekday = [
        "SUN","MON","TUE","WED","THU","FRI","SAT"
    ];
    day = weekday[currentTime.getDay()];
    return day;
};

const getCurrentTime = () => {
    let months = [
        "JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"
    ];
    let month = months[currentTime.getMonth()];
    let day = currentTime.getDate();
     
    return `${month} ${day}`;
};

week.innerHTML = getCurrentDay();
date.innerHTML = getCurrentTime();

const getInfo = async(event)=>{
    event.preventDefault();
    let cityVal = cityName.value;

    if(cityVal ==  ""){
        temp.innerText = 0;
        place.innerHTML = "Please Enter Some City Name";
        tmp_status.innerHTML = '<i class="fas fa-question"></i>';
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=cb565c9210acdc7379ab1e3792a14693&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            temp.innerText = arrData[0].main.temp;
            place.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            const tempMood = arrData[0].weather[0].main;

            if(tempMood == "Clear"){
                tmp_status.innerHTML = '<i class="fas fa-sun"></i>';
            }else if(tempMood == "Clouds"){
                tmp_status.innerHTML = '<i class="fas fa-cloud"></i>';
            }else if(tempMood === "Rain"){
                tmp_status.innerHTML = '<i class="fas fa-cloud-rain"></i>';
            }else{
                tmp_status.innerHTML = '<i class="fas fa-cloud"></i>';
            }
        }catch{
            temp.innerText = 0;
            place.innerHTML = "Please Enter Correct City Name";
            tmp_status.innerHTML = '<i class="fas fa-question"></i>';
        }
    }
};

submitBtn.addEventListener('click', getInfo); 