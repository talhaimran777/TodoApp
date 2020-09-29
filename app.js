const express = require('express');
const path = require('path');
const app = express();

// Serving express static files like css, js and imgages
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: path.resolve()});
});

app.post('/submit', (req, res) => {
    // redirect to  the home page
    //res.redirect('/');
    res.send('Your data was added to the database');
    console.log('You Added: ', req.body.data);
});


app.listen(3000, () => console.log('Listening for requests'));