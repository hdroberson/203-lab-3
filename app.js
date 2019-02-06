var express = require('express');
var app = express();
var Person;
var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
    useMongoClient: true
}); 
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('error connecting', err);
});

db.on('open', function () {
    var personSchema = mongoose.Schema({
        name: String,
        last: String,
        userName: String,
        password: String
    });
    Person = mongoose.model('employee', personSchema);
});


app.get('/', function (req, res) {
    res.json('Hello World from Root');
});

app.get('/API/posttest', function (req, res) {
    var harold = new Person ({
        name : 'Harold',
        last : 'Roberson',
        userName : 'harold14',
        password : 'smokie'
    })
    harold.save(function (err, theObject) {
        if(err) {
            res.json(err);
        }
        res.json(harold);
    });

});



app.delete('/API/delete', function (req, res) {
    Person.find({ name: 'Billy' }, function (err, data) {
        if(err) {
            res.json(err);
        }
        res.json(data);
    });
});



app.listen(3000, function () {
    console.log('server running on: localhost:3000');
});
