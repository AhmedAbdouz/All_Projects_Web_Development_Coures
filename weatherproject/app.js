const express = require("express");
const https = require("https");

const app = express();


app.listen(3000, function() {

});

app.get("/", function(req, res) {
    var url = "https://samples.openweathermap.org/data/2.5/weather?q=london,uk&appid=fdd7d3af4616bf5684bc9d7498ce1abf";
    https.get(url, function(response) {
        response.on("data", function(data) {
                const weather = JSON.parse(data);
                const icon = weather.weather[0].icon;

                const temp = weather.main.temp;
                res.send('<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" alt="">');
                // res.write("Hello " + temp + "/n");
                res.send();
                // console.log(weather);

            })
            // res.send(response.statusMessage);
            // console.log(response.statusCode);
    });
});