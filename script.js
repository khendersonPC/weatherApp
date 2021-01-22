
// This is our API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var city = "";


$("#current").click(function () {
    city = $("#city").val();
    alert("The city you selected is " + city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + city + "&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            console.log(response.weather[0].main);
            console.log(response);

            if(response.weather[0].main=="Thunderstorm" ||response.weather[0].main=="Rain" ||response.weather[0].main=="Drizzle"){
                console.log("It is raining");
                var i=$("<img src='clouds.png'>");
                $(".results").append(i);
                $("body").addClass("gray");

            }
            else if(response.weather[0].main=="Snow"){

            }
            else if( response.weather[0].main=="Clear"){

            }
            else if(response.weather[0].main=="Clouds"){

            }
            else{
                console.log("You are experiencing extreme weather");
            }


            // Transfer content to HTML
            // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            //$(".wind").text("Wind Speed: " + response.wind.speed);
            //$(".humidity").text("Humidity: " + response.main.humidity);

            // Convert the temp to fahrenheit
            //var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            // add temp content to html
            //$(".temp").text("Temperature (K) " + response.main.temp);
            //$(".tempF").text("Temperature (F) " + tempF.toFixed(2));

            // Log the data in the console as well
            //console.log("Wind Speed: " + response.wind.speed);
            //console.log("Humidity: " + response.main.humidity);
            //console.log("Temperature (F): " + tempF);
        });

    /*
      $( "#menu" ).change(function() {
          city=$("#city").val();
          console.log("The city you selected is " + city);
          alert( "Handler for .change() called." );
        });
  */

    // Here we are building the URL we need to query the database

});
