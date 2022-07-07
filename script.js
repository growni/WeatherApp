
//https://api.open-meteo.com/v1/forecast?latitude=%f&longitude=%f&hourly=temperature_2m&current_weather=true&windspeed_unit

window.addEventListener("load", solve);

function solve() {
    const button = document.querySelector("button");
    const inputElement = document.querySelector("input");
    const tempElement = document.querySelector('#temp h2');
    const dateElement = document.querySelector('#date h2');
    const windSpeedElement = document.querySelector('#windSpeed h2');
    const hiddenElements = Array.from(document.querySelectorAll('.hidden'));
    const hiddenDiv = hiddenElements[1];
    const heading = document.querySelector('h1');

    let latitude = 0;
    let longitude = 0;
    let country = '';

    let currentTemp = 0;
    let windSpeed = 0;
    let date = 0;

    async function findCountry() {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputElement.value}`);
        const results = response.json();
        console.log(results);
        return results

    }

    async function fillData(lat, long) {

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current_weather=true&windspeed_unit&timezone=UTC`)
        const data = await response.json();

        return data;
    }



    button.addEventListener("click", showInfo);



    function showInfo(e) {


        e.preventDefault();

        findCountry().then(results => {
            
            latitude = results.results[0].latitude;
            longitude = results.results[0].longitude;
            country = results.results[0].country;

            fillData(latitude, longitude).then(data => {

                currentTemp = data.current_weather.temperature;
                windSpeed = data.current_weather.windspeed;
                date = data.current_weather.time;

                if(inputElement.value == country) {
                    heading.textContent = `Current weather for: ${inputElement.value}`;
                } else {
                    heading.textContent = `Current weather for: ${inputElement.value}, ${country} `;
                }

                tempElement.textContent = currentTemp + ' C\u00B0';
                dateElement.textContent = date.split('T')[0];
                windSpeedElement.textContent = windSpeed + ' km/h';
    
                hiddenElements.forEach(e => e.classList.remove('hidden'))
                hiddenDiv.className = 'infoContainer'
                inputElement.value = '';
            });
            
        })

        


    }


}

// current_weather: {temperature: 17.7, windspeed: 12.3, winddirection: 291, weathercode: 2, time: '2022-07-06T08:00'}
// elevation: 38
// generationtime_ms: 2.789020538330078
// hourly: {temperature_2m: Array(168), time: Array(168)}
// hourly_units: {temperature_2m: '°C', time: 'iso8601'}
// latitude: 52.52
// longitude: 13.419998
// utc_offset_seconds: 0