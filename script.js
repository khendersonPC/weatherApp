
// Setting up global variables
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var city = "";
var cities = JSON.parse(localStorage.getItem('cities')) || [];
var storedCities = JSON.parse(localStorage.getItem("cities"));
var lat = "";
var long = "";

//creating an image div for the main icon and adding it to the html
var i = $("<img id='currentIcon' style='display: block; margin-left: auto;margin-right: auto;'>");
var tempDiv = $("<div>");
var temp = $("<h2 class= 'tempH'>");
var uv = $("<h2 class= 'uv'>");
var hum = $("<h2 class= 'hum'>");
var wind = $("<h2 class= 'wind'>");
$(".results").append(tempDiv);
$(tempDiv).append(temp, hum, wind,uv);
$(".results").append(i);
//Hiding the forecast
$("#forecast").hide();
$(".card-deck").hide();

$("#testedCities").show();
$(".search").remove();
    for (var i = 0; i < cities.length; i++) {
        var b = $("<input class='btn btn-outline-secondary search' id='cityToSearch"+i+ "' type='button' value='" + cities[i] + "' style='margin-top:2%'>"+" </input>");
        $("#testedCities").append(b);
    }
    $("#testedCities").show();
/*
if(StoredCities!== null){
    cities = storedCities;
}
*/


//This is for the current conditions selection
$("#current").click(function () {
    //hide the forcast, show the main icon
    $("#currentIcon").show();
    $("#forecast").hide();
    $(".card-deck").hide();
    $("body").removeClass("yellow");

    //storing city choice
    storeCity();
    //get the current temp & main weather icon
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + city + "&appid=" + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            //getting long and lat from the response for the UV index
            long = response.coord.lon;
            lat = response.coord.lat;
            //calculating temp
            console.log(response);
            var humid=response.main.humidity;
            var wind=response.wind.speed;
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(".tempH").text("Current temperature: " + tempF.toFixed(1) + "°C");
            $(".hum").text("Humidity: " + humid + "%");
            $(".wind").text("Wind: " + wind + "mph");
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
                for (var i = 0; i < 20; i++) {
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
        }).then(function(){
            var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long +
            "&appid=" + APIKey;
        $.ajax({
            url: queryURL2,
            method: "GET"
        })
            .then(function (response) {
                //setting the uv index on the screen
                $(".uv").text("UV Index: " + response.value);
                if(response.value>=0 && response.value<=2){
                    uv.addClass("good");
                }
                else if(response.value>=3 && response.value<=5){
                    uv.addClass("ok");
                }
                else{
                    uv.addClass("bad");
                }
            });
        });

     //Getting UV index.   
    
});

//5 day forecast selection
$("#forecastBut").click(function () {
    //resetting the h2, hiding the main icon, show the forecasr and the card deck
    $("body").removeClass("yellow");
    $("h2").text("");
    $("#currentIcon").hide();
    $("#forecast").show();
    $(".card-deck").show();
    //store the city choice
    storeCity();
    //getting the forecast
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var dayc = 4;

            for (var i = 0; i < 5; i++) {

                var iconcode = response.list[dayc].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                $("#wicon" + i).attr("src", iconurl);
                $("#wicon" + i).attr("width", "20px");
                $("#date" + i).text(response.list[dayc].dt_txt.substring(0, 10));
                var tempF = (response.list[dayc].main.temp - 273.15) * 1.80 + 32;
                $("#temp" + i).text(tempF.toFixed(1) + "°C");
                $("#desc" + i).text(response.list[dayc].weather[0].description);
                $("#hum" + i).text("Humidity: " + response.list[dayc].main.humidity + "%");
                dayc = dayc + 8;
            }

        });

});


//creating past search buttons
// $("#menu").on('click', function () {
//     //remove old buttons
//     $(".search").remove();
//     for (var i = 0; i < cities.length; i++) {
//         var b = $("<input class='btn btn-outline-secondary search' id='cityToSearch"+i+ "' type='button' value='" + cities[i] + "' style='margin-top:2%'>"+" </input>");
//         $("#testedCities").append(b);
//     }
//     $("#testedCities").show();
// });

//this isn't working. Trying to get the buttons clicked to fill the text value of city selected
$(document).on("click", ".btn-outline-secondary", function(){
    console.log("clicked");
    var oldCity=$(this).val();
    console.log(oldCity);
    $("#city").val(oldCity);

});

function storeCity(){
    city = $("#city").val();
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }
}
