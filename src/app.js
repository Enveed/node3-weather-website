//Main Driver

const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

const app = express()

//Setup Handlebars engine and Views location
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../templates/views"))
hbs.registerPartials(path.join(__dirname, "../templates/partials"))

//Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")))

/* app.get("", (req, res) => {
    res.send("<h1>Weather</h1>")
}) */

/* app.get("/help", (req, res) => {
    res.send([{
        name: "Andrew",
        age: 27
    },
    {
        name: "Sarah",
        age: 23
    }])
})

app.get("/about", (req, res) => {
    res.send("<h1>About page</h1>")
}) */

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Rith"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Andrew"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpMessage:"This is some helpful text.",
        name: "Andrew"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address)
        return res.send({
            error: "You must provide an address"
        })
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) =>
    {
        if (error)
            return res.send({error})

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error)
                return res.send({error})

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
}) 

app.get("/products", (req, res) => {
    if (!req.query.search)
        return res.send({
            error: "You must provide a search term"
        })

    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Rith",
        errorMessage: "Help article not found. "
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Rith",
        errorMessage: "Page not found."
    })
})  

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})
