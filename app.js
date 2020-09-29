const express = require('express');
const path = require('path');
const app = express();

// Serving express static files like css, js and imgages
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: path.resolve()});
});


app.listen(3000, () => console.log('Listening for requests'));