//Client-Side JS

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
    response.json().then((weatherData) => {
        if (weatherData.error)
            return messageOne.textContent = weatherData.error
        messageOne.textContent = weatherData.location
        messageTwo.textContent = weatherData.forecast.weatherStatus + ". The current temperature is: " + weatherData.forecast.Temperature + ". There's " + weatherData.forecast.chanceofRain + " chance of raining."
    })
})
})