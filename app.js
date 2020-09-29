const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: path.resolve()});
});


app.listen(3000, () => console.log('Listening for requests'));