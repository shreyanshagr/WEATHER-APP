const express = require('express')

const app = express()

const https = require('https')
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.get("", function (req, res) {
    console.log("I am here 1");
    res.sendFile(__dirname + "/index.html")

})

app.post("/", function (req, res) {
    const lat = req.body.latitude;
    const long = req.body.longitude;
    console.log("I am here 2");
    console.log(req.body.latitude);
    console.log(req.body.longitude);
    console.log("I am here 3");
    // lat = 26.0739
    // long = 83.1859
    url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=6ddacdbdec114d646d2984bf6b9b9c0d"

    https.get(url, function (response) {
        console.log(response.statusCode)
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            // console.log(weatherData);
            const K = weatherData.main.temp
            console.log(`Temp is ${K}`);
            console.log(`Place is ${weatherData.name}`);
            const temp = K - 273
            const icon = weatherData.weather[0].icon
            const icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>Place is " + weatherData.name + "</p>");
            res.write("<h1>Temp is" + temp + "  degrees Celcuis</h1>")
            res.write("<img src=" + icon_url + ">")

            res.send()

        })
    })

})

app.listen(8000, function () {
    console.log("Server is listening on port 8000");
})