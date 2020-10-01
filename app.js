const express = require('express');
const path = require('path');
const app = express();

// require mongodb
const mongodb = require('mongodb');

let db;

let connectionString = `mongodb+srv://talhaimran:talha157@cluster0.u8ext.gcp.mongodb.net/TodoApp?retryWrites=true&w=majority`;

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) =>{
    if(!err){
        db = client.db();
        console.log('Connected to the mongodb')
        app.listen(3000, () => console.log('Listening for requests'));
    }
    else{
        console.log("Error Connecting to the data base");
    }
});

// Register a view engine
app.set('view engine', 'ejs');

// Serving express static files like css, js and imgages
app.use(express.static('public'));

// This is just for getting data passed through form submission and bind it in the request object
app.use(express.urlencoded({extended: false}));

// Bind data when asynchronous request comes from the client side to the req object
app.use(express.json());

app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', {root: path.resolve()});

    // Before rendering this you want to get all the data from the data base

    db.collection('items').find().toArray((err, data) =>{
       // console.log("Data received from the mongodb:: ", data);
        res.render('index', {data});
    });
});


app.post('/create-item', (req, res) => {

    db.collection('items').insertOne({text: req.body.data}, () => {
        res.redirect('/');
    });
    //console.log('You Added: ', req.body.data);
});

app.post('/update-item', (req, res) => {
    // console.log(" received data from the client: ", req.body.text, "ID: ", req.body.id);

    //Put logic here to make proper updates to the database

    let updatedText = req.body.text;
    let idToBeUpdated = req.body.id;
    //console.log("ID to be updated: ", idToBeUpdated);

    db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectID(idToBeUpdated)}, {$set: {text: updatedText}})
    .then(()=>{
        res.send('Updated successfully.');
    })
    .catch('Data could not be updated!');

});


