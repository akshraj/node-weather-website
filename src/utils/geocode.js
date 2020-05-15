const request = require('request')

const geocode = (address, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWtzaGF5LTEyNCIsImEiOiJja2EzZXA0dzEwYnI5M2VtenhmaXF3ODB4In0.OD6iZFWtIA9WksngoxhttQ&limit=1'
    request({url: geoURL, json: true},(error, response) => {
        if(error){
            callback('unable to connect to geo service!!',undefined)
        }else if(response.body.features.length === 0){
            callback('unable to find location. Try another search',undefined)
        }else{
            const {features} = response.body
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}


module.exports = geocode