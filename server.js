const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
// you can use these functions in .hbs
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

// express middleware

// log request
app.use((req, res, next) => {
    // log text
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    // save to file
    fs.appendFile('server.log', log + '\n', err => {
        if (err)
            console.log('Unable to append log.');
    });
    console.log(log);
    next();
});

// maintenance
app.use((req, res, next) => res.render('maintenance.hbs'));

// load public folder
app.use(express.static(__dirname + '/public'));

// end express middleware

app.get('/', (req, res) => {
    // res.send({
    //     name: 'Yanu',
    //     likes: [
    //         'Girl',
    //         'Movies'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to home page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    // res.send('About Page.');
    res.render('about.hbs',  {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unbale to handle request.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
