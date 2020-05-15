const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Akshay'
    })
})



app.get('/about',(req,res) => {
    res.render('about',{
        helpText: 'About',
        title: 'Weather',
        name: 'Akshay'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error){
           return res.send({
                error
            })
        }
        forecast(latitude, longitude, location,(error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

})

app.get('*',(req, res) => {
    res.render('error',{
        title: '404',
        name: 'akshay',
        errorMessage: 'page not found'
    })
})

app.listen(port,() => {
    console.log('app is listening on port' + port)
})