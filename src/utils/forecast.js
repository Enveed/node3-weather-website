const request = require("request")

const forecast = (latitude, longtitude, callback) => {

    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + encodeURIComponent(latitude) + "&lon=" + encodeURIComponent(longtitude) + "&exclude=minutely,hourly,alerts&appid=5ac5a36de3930c0586aa7fe29d64991e&units=metric"
    request({ url, json: true}, (error, {body}) => {
        if (error)
            callback("Unable to connect to Weather Service!", undefined)
        else if (body.message)
            callback("Unable to find location!", undefined)
        else
            callback(undefined, {
                "weatherStatus": body.current.weather[0].description, 
                "Temperature" : body.current.temp,
                "chanceofRain": (body.daily[0].pop*100).toString() + "%",
                "minTemp": body.daily[0].temp.min,
                "maxTemp": body.daily[0].temp.max
            })
    })
}

module.exports = forecast
