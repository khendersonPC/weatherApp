
// This is our API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var city = "";
var i=$("<img>");
var tempDiv= $("<div>");
var temp =$("<h2 class= 'tempH'>");
$(".results").append(tempDiv);
$(tempDiv).append(temp);
$(".results").append(i);

$("#current").click(function () {
    city = $("#city").val();
    alert("The city you selected is " + city);
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
            
            console.log(response.weather[0].main);
            console.log(response);
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $("h2").text("Current temperature: " + tempF.toFixed(1) + "&#x2103;");
            if(response.weather[0].main=="Thunderstorm" ||response.weather[0].main=="Rain" ||response.weather[0].main=="Drizzle"){
                console.log("It is raining");
                
                
                $("img").attr("src", "clouds_rain.png");


            }
            else if(response.weather[0].main=="Snow"){
                console.log("It is snowing");
                
                $("img").attr("src", "snow.png");
                

            }
            else if( response.weather[0].main=="Clear"){
                console.log("It is sunny");
                
                $("img").attr("src", "sun.png");
                $("body").addClass("yellow");
                
                for(var i = 0; i<50;i++){      
                  $("img").animate({ height: "570px", width: "530px"} , 1500);
                  $( "img" ).animate({height: "600px", width: "550px"}, 1500 );
                }
            }
            else if(response.weather[0].main=="Clouds"){
                console.log("It is partially cloudy");
                
                $("img").attr("src", "clouds_sun.png");
                

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

var active = function(){
    $('img').removeClass('inactive').addClass('active');
  };
  
  var inactive = function(){
    $('img').removeClass('active').addClass('inactive');
  };