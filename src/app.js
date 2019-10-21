const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weatherInfo = require(__dirname + '/utils.js');

const app = express();
const port = process.env.PORT || 3000;

console.log(__dirname);
console.log(__filename);

//console.log(path.join(__dirname, '../public'));
//Define paths for Express config.
publicDirectoryPath = path.join(__dirname, '../public'); //This is to get the public folder path from src.
viewsPath = path.join(__dirname, '../templates/views');
partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars and views location,
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);



// Setup static directory to serve.
app.use(express.static(publicDirectoryPath)); 

app.get('/', (req,res) => {
    res.render('index', {
        title:'Weather',
        name:'Ali Mohamed Ghaus'
})
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ali Mohamed Ghaus'})
})

app.get('/help', (req,res) => {

    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page.',
        name:'Ali Mohamed Ghaus'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({error: 'Must provide an address'})
    }else {                                          //Destructuing the data object that is returned from the callback function.
        weatherInfo.geocode(req.query.address,(error,{latitude,longitude,location} = {}) => { //Set the {lat,long location} object to accept a default empty object when no object returned.
            if(error){                                                                        //Helps to prevent the code from crashing. 
                return res.send({error});
            }else{
                weatherInfo.forecast(latitude,longitude,(error,forecastData)=>{
                    if(error){
                        return res.send({error});
                    }

                    //res.send(data);
                    res.send({
                        forecast: forecastData,
                        location, //Object shorthand property. If the property key and value same can write in this manner.
                        address: req.query.address
                    });

                })
            }

        })
    }
})

app.get('/products', (req,res) => {
    if(!req.query.search){
    return res.send({error:'Must provide a search term'});
    }
    console.log(req.query); // req.query gets the querystrings at the end of the url.
    res.send({
        products:[]
    });
})

app.get('/help/*', (req,res) => {

    res.render('error', {
        title: '404 Page ',
        name: 'Ali Mohamed Ghaus',
        error:'Help article not found'
    })
})

//Wildcard character (*) if no routes matched. Display 404 page.
app.get('*', (req,res) => {
    res.render('error', {
        title: '404 Page ',
        name: 'Ali Mohamed Ghaus',
        error:'Page not found'
    })

})
//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});