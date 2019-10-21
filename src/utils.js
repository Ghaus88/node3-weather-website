const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZ2hhdXM4OCIsImEiOiJjazFoampiaWkwOTB1M2luMGRzcnV1MDVoIn0.UcTyScd357-G0UjSFTFi7A&limit=1'

    request({url, json:true}, (error,response) => {
        if(response.body.features.length === 0) {

            callback('Location service not found. Try another search',undefined);

        }else {

        const {center,place_name} = response.body.features[0]; //object destructuring.
       
        const latitude = center[1]; // Defne the variable then use the same name in the object.
        const longitude = center[0];
        const location = place_name;

        if(error){
            callback('Location services not found',undefined);

        }else{
            callback(undefined,{
                latitude, // Object property short-hand. Define the variable outside then use the same variable name as the property in the object.
                longitude,
                location
            })

        }
     }

    })
}

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/74666d2493d16f9096d9617a9ce42e7d/'+ encodeURIComponent(latitude) +"," + encodeURIComponent(longitude) +'?units=si';

    request({url, json:true},(error,response)=>{

            const{summary,temperatureHigh,temperatureLow} = response.body.daily.data[0];
            const {temperature,precipProbability} = response.body.currently;

        if(error){
            callback('Unable to connect to weather services.',undefined);

        }else if(response.body.error){
            callback('Unable to get location.Please try again.', undefined);

        }else{
            callback(undefined,summary + "It is currently " + temperature + " degress out." + "There is " + precipProbability + " % chance of rain." + "The temperature high and low is " + temperatureHigh + " and " + temperatureLow + " degress Celsius respectively." )

            // temperature: response.body.currently.temperature,
            // precipitation:response.body.currently.precipProbability,
            // summary:response.body.daily.data[0].summary
        }

    })
}

module.exports = { 
    geocode: geocode,
    forecast: forecast
}