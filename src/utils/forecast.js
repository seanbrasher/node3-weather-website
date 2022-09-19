const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=af05cb48bc83643def9038a4a50bc7a1&units=f&query=' + latitude + ',' + longitude;

    request({ url, json: true}, (error, {body}) => {
    
    if(error){
        callback('Error connecting to weather service.'); //passing nothing for response
    } 
    else if(body.error){
        callback('No weather found for selected coordinates.'); //passing nothing for response
    }
    else
    {
        
        callback(undefined, {
            temperature: body.current.temperature,
            description: body.current.weather_descriptions[0].toLowerCase(),
            weatherIcon: body.current.weather_icons[0]


        })
    }
})

}

module.exports = forecast;