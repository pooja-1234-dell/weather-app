let searchInputBox = document.getElementById("search_inputfield");
let searchIcon = document.getElementById("search_icon");

searchIcon.addEventListener("click", async () => {
    let cityName = searchInputBox.value.trim();

    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }

    try {
        let API_KEY = "f86b61e2c240079e7dadedcf96c4d0a7";
        let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

        let response = await fetch(API_URL);
        if (!response.ok) throw new Error("City not found");
        let data = await response.json();
        console.log("Fetched data:", data);
        document.getElementById("city").textContent = data.name;
        document.getElementById("weather_text").textContent = data.weather[0].main;
        document.getElementById("temp").innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        document.getElementById("humi_per").textContent = `${data.main.humidity}%`;
        document.getElementById("speed").textContent = `${data.wind.speed} km/h`;

        let condition = data.weather[0].id;
        let img = document.getElementById("weather_image");

        if (condition >= 200 && condition <= 232) {
            img.src = "/ASSETS/img/WeatherThunder.png";
        }
        else if (condition >= 300 && condition <= 321){
             img.src = "/ASSETS/img/WeatherDrizzle.png";
        }
        else if (condition >= 500 && condition <= 531){
             img.src = "/ASSETS/img/WeatherRainy.png";
        }
        else if (condition >= 600 && condition <= 622){
             img.src = "/ASSETS/img/WeatherSnow.png";
        }
        else if (condition >= 701 && condition <= 781) {
            img.src = "/ASSETS/img/WeatherAtmosphere.png";
        }
        else if (condition === 800){
             img.src = "/ASSETS/img/WeatherClearSky.png";
        }
        else if (condition >= 801 && condition <= 804){
             img.src = "/ASSETS/img/WeatherCloudy.png";
        }
        else img.src = "/ASSETS/img/WeatherDefault.png";

    } catch (error) {
        alert("Error: " + error.message);
        console.error(error);
    } finally {
        searchInputBox.value = "";
    }
});
