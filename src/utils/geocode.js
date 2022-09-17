const request = require('request');

const geocode = (address, callback) => {
    const mbUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2VhbmJyYXNoZXIiLCJhIjoiY2w3dXkwZmZkMDZhdDN4b3hoOG9lbDhhcSJ9.EI1CybqVZPLBGXWn-Rnp7Q'

    request({ url: mbUrl, json: true}, (error, {body}) => {
    
        if(error){
            callback('Error connecting to location service.'); //passing nothing for response
        } 
        else if(body.features.length === 0){
            callback('No matching results for selected location.'); //passing nothing for response
        }
        else
        {
            const {center, place_name} = body.features[0]

            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })

}

module.exports = geocode;