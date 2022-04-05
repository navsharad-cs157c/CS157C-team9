const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const cors = require('cors');
const util = require('util');

// create redis client
const client = redis.createClient({
    url: ''
});

// client.set = util.promisify(client.set)

client.on('connect', function() {
    console.log('connected to redis.')
});

// connect to redis
client.connect();

// set port
const port = 5000;

// initialize app
const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

// use cors to avoid issues when accessing api
app.use(cors());

// app.get('/user/signin', function(req, res, next) {
//     res.json({"status": "200"});
// });

app.post('/user/signin', async function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    let key = `user:${email}`;
    console.log(key);
    console.log('in post method');

    // check if email and password combination exist
    const username = await client.hGetAll(key);
    const pass = await client.hGet(key, "password");
    console.log(pass);
    if (Object.keys(username).length === 0) {
        res.json({"status": "404"});
    } else {
        if (pass === password) {
            res.json({"status": "200"});
        } else {
            res.json({"status": "404"});
        }
    }

});

app.post('/user/signup', async function(req, res, next) {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let picture = req.body.picture;
    let key = `user:${email}`;

    // check if user already exists
    const username = await client.hGetAll(key);
    if (Object.keys(username).length === 0) { // if user does not exist create it
        client.hSet(key, "email", email);
        client.hSet(key, "name", name);
        client.hSet(key, "picture", picture);
        client.hSet(key, "password", password); // storing a password in the db without salt/hash is bad, we will fix this later
        res.json({"status": "200"});
    } else { // if user exists return error code
        res.json({"status": "404"});
    }

});

// return user details to client
app.get('/user/info/:id', async function(req, res, next) {
    let key = `user:${req.params.id}`;
    let userInfo = await client.hGetAll(key);
    res.send(userInfo);
});

app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});



