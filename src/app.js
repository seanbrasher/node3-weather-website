const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { response } = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//kick off web server
const app = express();
//use heroku port OR use 3000 when local
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up handlebars engine and views location
app.set('view engine','hbs');    //templating engine, which is hbs from npm
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up STATIC page routes directory
app.use(express.static(publicDirectoryPath));

//set up CUSTOM routes
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sean Brasher'
    });
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Weather App - About This App',
        name: 'Sean Brasher'
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Weather App - Help Menu',
        name: 'Sean Brasher'
    });
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }    
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            if(forecastData)          {
                return res.send({
                    forecast: forecastData.description,
                    temperature: forecastData.temperature,
                    location,
                    weatherIcon: forecastData.weatherIcon,
                    address: req.query.address
                });
            }
            else {
                return res.send({ 
                    error: 'Unexpected error retrieving data from forecast service.'
                })
            }    
          })
    })


    
})

app.get('/products', (req, res) => {
    //access querystring variables as properties of the query object
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    });
    
})


//404 within Help section
app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Weather App - Help Menu - Article Not Found',
        name: 'Sean Brasher',
        errorMessage: 'That help article was not found'
    });
})

//404
 app.get('*', (req, res) => {
    res.render('404',{
        title: 'Weather App - Page Not Found',
        name: 'Sean Brasher',
        errorMessage: 'Page not found'
    });
 })




//Start the server
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
});