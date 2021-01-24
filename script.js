
// This is our API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var city = "";
var lat = "";
var long = "";
var i = $("<img>");
var tempDiv = $("<div>");
var temp = $("<h2 class= 'tempH'>");
var uv = $("<h2 class= 'uv'>");
$(".results").append(tempDiv);
$(tempDiv).append(temp, uv);
$(".results").append(i);

//This is for the current conditions selection
$("#current").click(function () {
    city = $("#city").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + city + "&appid=" + APIKey;
    $("body").removeClass("yellow");
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            long = response.coord.lon;
            lat = response.coord.lat;
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(".tempH").text("Current temperature: " + tempF.toFixed(1) + "°C");

            if (response.weather[0].main == "Thunderstorm" || response.weather[0].main == "Rain" || response.weather[0].main == "Drizzle") {
                $("img").attr("src", "clouds_rain.png");
            }
            else if (response.weather[0].main == "Snow") {
                $("img").attr("src", "snow.png");
            }
            else if (response.weather[0].main == "Clear") {
                $("img").attr({ src: "sun.png", height: "600px", width: "550px" });
                $("body").addClass("yellow");
                //animation

                for (var i = 0; i < 10; i++) {
                    $("img").animate({ height: "570px", width: "530px" }, 1500);
                    $("img").animate({ height: "600px", width: "550px" }, 1500);
                }

            }
            else if (response.weather[0].main == "Clouds") {
                $("img").attr("src", "clouds_sun.png");
            }
            else {
                $(".tempH").text("You are experiencing extreme weather");
            }
        });



    var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long +
        "&appid=" + APIKey;
    $.ajax({
        url: queryURL2,
        method: "GET"
    })

        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            $(".uv").text("UV Index: " + response.value);

        });


});

//5 day forecast
$("#forecast").click(function () {

    $("h2").text("");
    $("img").remove();
    city = $("#city").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    $("body").removeClass("yellow");

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            var dayc = 4;
            for (var i = 0; i < 5; i++) {

                var iconcode = response.list[dayc].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                $("#wicon" + i).attr("src", "http://openweathermap.org/img/wn/10d@2x.png");
                $("#date" + i).text(response.list[dayc].dt_txt.substring(0, 10));
                var tempF = (response.list[dayc].main.temp - 273.15) * 1.80 + 32;
                $("#temp" + i).text(tempF.toFixed(1) + "°C");
                $("#desc" + i).text(response.list[dayc].weather[0].description);
                dayc = dayc + 8;
            }
            $('#forecast').show();
        });

});