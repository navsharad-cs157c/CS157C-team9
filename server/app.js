const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const cors = require('cors');
const util = require('util');
const { REDIS_URL } = require('./config');

// create redis client
//Add Config.js file at the same direcotry level as this file.
//It contains : exports.REDIS_URL = <Redis_URL>;
const client = redis.createClient({
    url: REDIS_URL
});

// client.set = util.promisify(client.set)

client.on('connect', function() {
    console.log('connected to redis.')
});

// connect to redis
process.on('uncaughtException', function (error) {    
    console.log(error.stack);
    console.log("Node NOT Exiting...");
});

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

// updates user personal information
app.post('/user/update/:id', async function(req,res,next) {
    let name = req.body.name;
    let picture = req.body.picture;
    let bio = req.body.bio;
    let key = `user:${req.params.id}`;

    if (name) client.hSet(key, "name", name);
    if (picture) client.hSet(key, "picture", picture);
    if (bio) client.hSet(key, "bio", bio); 
    res.json({"status": "200"});
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
// app.get('/getProducts', async (req, res) => {
//     const products = await client.keys("product:*");
//     let prodlist = []
    
//     await products.forEach(async product => {
//         let returnProd = await client.hGetAll(product);
//         prodlist.push(returnProd);
//     });
//     res.send(prodlist);
// });

app.post('/posting/setProduct', async function(req, res) {
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let image = req.body.image;
    let time = client.TIME;
    let poster_email = req.body.userEmail;
    let key = "product:" + title; // SET A NEW KEY FOR EACH PRODUCT
    // Add the product info under the key
    client.hSet(key, "title", title);
    client.hSet(key, "description", description);
    client.hSet(key, "price", price);
    client.hSet(key, "image", image);
    client.hSet(key, "time_posted", time);
    client.hSet(key, "poster_email", poster_email);
    res.json({"status": "200"});
});

app.get('/getProducts', async (req, res) => {
    const products = await client.keys("product:*");
    let prodlist = []
    
    // await products.forEach(async product => {
    //     let returnProd = await client.hGetAll(product);
    //     prodlist.push(returnProd);
    // });
    Promise.all(products.map(product => client.hGetAll(product))).then(values => {
        res.send(values);
    });
    // res.send(prodlist);
    
});

app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});

