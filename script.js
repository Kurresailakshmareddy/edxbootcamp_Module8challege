$(document).ready(function () {
    // Function to handle form submission
    $("#search-form").submit(function (event) {
        event.preventDefault();

        // Get the city input value
        var city = $("#search-input").val();

        // Call a function to fetch weather data
        getWeatherData(city);
    });

    // Function to fetch weather data from an API
    function getWeatherData(city) {
        // Use an API (e.g., OpenWeatherMap) to get weather data for the specified city
        // Include the necessary API key and handle the response
        // Update the DOM with the retrieved data
        // Display current weather and 5-day forecast

        // Example API call with placeholder URL
        var apiKey = "";
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function (data) {
                // Handle the data and extract coordinates
                var lat = data.coord.lat;
                var lon = data.coord.lon;
            },
            error: function (error) {
                console.log("Error fetching weather data:", error);
            },
        });
    }

    // Function to display weather data in the DOM
    function displayWeather(data) {
        // Extract relevant information from the API response
        var city = data.name;
        var date = new Date(data.dt * 1000); // Convert timestamp to date object
        var icon = data.weather[0].icon;
        var temperature = data.main.temp;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;

        // Update the DOM with current weather information
        $("#today").html(`
        <h2>${city} (${date.toLocaleDateString()})</h2>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `);

        // Call a function to get and display the 5-day forecast
        getFiveDayForecast(city);
    }

    // Function to get and display the 5-day forecast
    function getFiveDayForecast(city) {
        var apiKey = "";
        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            success: function (data) {
                // Handle the forecast data and update the DOM
                displayFiveDayForecast(data);
            },
            error: function (error) {
                console.log("Error fetching forecast data:", error);
            },
        });
    }

    // Function to display the 5-day forecast in the DOM
    function displayFiveDayForecast(data) {
        // Extract relevant information from the forecast data
        var forecastList = data.list;

        // Clear previous forecast data
        $("#forecast").empty();

        // Loop through the forecast data for each day
        for (var i = 0; i < forecastList.length; i++) {
            // Extract data for each day
            var date = new Date(forecastList[i].dt * 1000);
            var icon = forecastList[i].weather[0].icon;
            var temperature = forecastList[i].main.temp;
            var humidity = forecastList[i].main.humidity;

            // Create HTML elements for each day's forecast
            var forecastItem = $("<div>").addClass("col-md-2 forecast-item");
            forecastItem.html(`
            <h5>${date.toLocaleDateString()}</h5>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
        `);

            // Append the forecast item to the forecast section
            $("#forecast").append(forecastItem);
        }
    }

});
