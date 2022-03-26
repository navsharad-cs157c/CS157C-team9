const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const client = redis.createClient({
    url: 'do not upload url to github, its sensitive info i will pm you guys'
});

const port = 3000;

client.on("error", function (error) {
    console.log("Error: ", error);
});

client.on("connect", function (error) {
    console.log("Successfully connected to database!");
});


