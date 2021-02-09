// Set date input value today
let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("inputDate").defaultValue = today;

// Set date input max value 5 days from today
let maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 5);
const maxdd = String(maxDate.getDate()).padStart(2, '0');
const maxmm = String(maxDate.getMonth() + 1).padStart(2, '0');
const maxyyyy = maxDate.getFullYear();
maxDate = maxyyyy + '-' + maxmm + '-' + maxdd;
document.getElementById("inputDate").setAttribute("max", maxDate);;

// Set date input min value 30 days from today
let minDate = new Date();
minDate.setDate(minDate.getDate() - 30);
const mindd = String(minDate.getDate()).padStart(2, '0');
const minmm = String(minDate.getMonth() + 1).padStart(2, '0');
const minyyyy = minDate.getFullYear();
minDate = minyyyy + '-' + minmm + '-' + mindd;
document.getElementById("inputDate").setAttribute("min", minDate);;


window.onload = function () {

    const xhttp = new XMLHttpRequest();
    const form = document.querySelector('#weather-form');

    form.addEventListener('submit', sendJson)

    function sendJson(event) {
        event.preventDefault();
        city = event.target.querySelector("#inputCity").value;
        date = event.target.querySelector("#inputDate").value;
        date = date.replaceAll("-", "/");
        const jsonOb = {
            "inputCity": city,
            "inputDate": date
        }
        sendReq(jsonOb);
    }

    function sendReq(jsonOb) {
        xhttp.open("POST", "/", true);
        xhttp.setRequestHeader('Content-type', 'application/json');

        xhttp.onload = function () {
            const result = JSON.parse(xhttp.response);

            if (result.msg == "") {
                let min_temp = result.min_temp;
                let max_temp = result.max_temp;
                let temp = result.temp;
                let state = result.state;
                let icon = result.icon;
                let date = result.date;

                document.querySelector("#result-max").innerHTML = min_temp;
                document.querySelector("#result-min").innerHTML = max_temp;
                document.querySelector("#result-temp").innerHTML = temp;
                document.querySelector("#result-date").innerHTML = date;
                document.querySelector("#result-state").innerHTML = state;
                document.querySelector("#msg").innerHTML = result.msg;
                document.querySelector("#selected-icon").src = `https://www.metaweather.com/static/img/weather/ico/${icon}.ico`;

                document.querySelector("#result").style.visibility = "visible";
            } else {
                document.querySelector("#result").style.visibility = "hidden";
                document.querySelector("#msg").innerHTML = result.msg;
            }
        };
        xhttp.send(JSON.stringify(jsonOb));
    }
};
