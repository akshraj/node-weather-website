const request = require('request')
const forecast = (latitude, longitude, location , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=cdf9d5e3586ae15c8b95da77f5d44720&query='+ latitude + ','+ longitude
    request({url: url, json: true},(error,response) => {
        if(error){
            callback('unable to connect to internet', undefined)
        }else if(response.body.error){
            callback('No coordinates found. Try another search',undefined)
        }else{
            const {temperature, weather_descriptions,} = response.body.current
            callback(undefined, 'There is '+ temperature + ' degree temperature And '+ weather_descriptions[0] + ' outside in ' + location + ' today')
        }
    })
}

module.exports = forecast