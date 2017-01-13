$(document).ready(function(){
  //let's get the information on the user's location
  function getUserInfo(){
    $.getJSON("http://ip-api.com/json", function(json){
      var lat = json.lat;
      var lon = json.lon;
      var city = json.city
      var state = json.region

      //Here it will decide either to use °F or °C based on the user's location
      var unit;
      var unitURL;
      if(json.country === "United States"){
        unit = "fahren"
        unitURL = "imperial"
      } else{
        unit = "celcius"
        unitURL = "metric"
      }
      //Let's get the weather information here..
      var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
        lat + '&lon=' + lon + '&APPID=58c66943b970ef7280bb9d1a20f4abaf&units=' + unitURL;
      $.getJSON(weatherURL, function(weatherInfo){

        var location = json.city;
        var iconID = weatherInfo.weather[0].id;
        var imageURL = "wi wi-owm-" + iconID;
        var temp = weatherInfo.main.temp;
        var highTemp = weatherInfo.main.temp_max;
        var lowTemp = weatherInfo.main.temp_min;
        var humidity = weatherInfo.main.humidity;
        var tempDescription = weatherInfo.weather[0].main;


        $("#temperature").addClass(unit); //addClass to temp based on unit

        $("#location p").append(location);
        $("#temperature p").append(temp + "°F");
        $("#icon p").html("<i class='" + imageURL + "'></i> ");
        $("#description p").html(tempDescription)
        $("#high-temperature p").prepend(Math.round(highTemp) + "°")
        $("#low-temperature p").prepend(Math.round(lowTemp) + "°");
        $("#humidity p").prepend(humidity);
      })
    });
  };

  function toCelsius(number){
    return (parseFloat(number) - 32) * (5/9);
  }

  function toFahren(number){
    return (parseFloat(number) * (9/5)) + 32;
  }

  $("#iphone").click(function(){
    var unit = $("#temperature").attr('class').split(' ')[1];
    if (unit === 'fahren'){
      var fahUnit = $("#temperature p").text().slice(0,-2);
      var celUnit = toCelsius(fahUnit)

      var highTemp = $("#high-temperature p").text().slice(0,-1)
      var celHighTemp = toCelsius(highTemp)

      var lowTemp = $("#low-temperature p").text().slice(0,-1)
      var celLowTemp = toCelsius(lowTemp)

      $("#temperature p").html(celUnit.toFixed(2) + "°C");
      $("#temperature").removeClass("fahren")
      $("#temperature").addClass("celsius")

      $("#high-temperature p").html(celHighTemp.toFixed(0)+ "°" + '<i class="wi wi-direction-up"></i>')
      $("#low-temperature p").html(celLowTemp.toFixed(0) + "°" + '<i class="wi wi-direction-down"></i>');


    }
    else if (unit == 'celsius'){
      var celUnit = $("#temperature p").text().slice(0,-2);
      var fahUnit = toFahren(celUnit);

      var highTemp = $("#high-temperature p").text().slice(0,-1)
      var fahHighTemp = toFahren(highTemp)

      var lowTemp = $("#low-temperature p").text().slice(0,-1)
      var fahLowTemp = toFahren(lowTemp)

      $("#temperature p").html(fahUnit.toFixed(2) + "°F");
      $("#temperature").removeClass("celsius")
      $("#temperature").addClass("fahren");

      $("#high-temperature p").html(fahHighTemp.toFixed(0)+ "°" + '<i class="wi wi-direction-up"></i>')
      $("#low-temperature p").html(fahLowTemp.toFixed(0) + "°" + '<i class="wi wi-direction-down"></i>');

    }
  })

  getUserInfo();
});
