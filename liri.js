require("dotenv").config();

var keys = require('./key.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
