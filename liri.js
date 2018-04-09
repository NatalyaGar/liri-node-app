// require("dotenv").config();
//Load the fs package to read and write
// var fs = require ("fs");

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

//Take data from
var keys = require('./keys.js');

var Twitter = require('twitter');

var spotify = require('spotify');

var getMyTweets = function(){ 

    var client = new Twitter(keys.twitterKeys);
    var params = {screen_name: 'Nat97941816'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        for(var i = 0; i<tweets.length; i++){
            console.log("Nat:" + tweets[i].created_at);
            console.log(" ");
            console.log(tweets[i].text);
        }
      }
    });
}   
//  var spotify = new Spotify(keys.spotifyKeys); 
 var getArtistNames = function(artist){
     return artist.name;
 }
 var getMeSpotify = function(songName){
    spotify.search({ type: 'track', query: songName}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        // console.log(data);
        // var songs = data.tracks.items;
        var songs = data.tracks;
        for(var i=0; i<songs.length; i++){
            console.log[i];
            console.log('artinst(s); ' + songs[i].artists.map(getArtistNames));
            console.log('song name ' + songs[i].name);
            console.log('album: ' + songs[i].album.name);
            console.log('------------------------');
        }
    });
}
//Switch case statment
var pick = function(caseData, functionData){
  switch(caseData){
    case "my-tweets":
        getMyTweets();
        break;
    case "spotify-this-song":
    getMeSpotify(functionData);
    break;    
    default:
    console.log('Liri does not know that');    
  }
}

var runThis = function(argOne, argTwo){
pick(argOne,argTwo);
};

runThis(process.argv[2], process.argv[3]);







//     case "spotify-this-song":
//     if(sm){
//         spotifySong(x);
//     }else{
//         spotifySong("The Sign");
//     }
//     break;

//     case "movie-this":
//     if(sm){
//         ombData(sm)
//     } else{
//         ombData("Mr. Nodody")
//     }
//     break;

//     case "do-what-it-says":
//     doIt();
//     break;
// }

// function showTweets(){
//     //Display 20 Tweets
//     var name = "Nat";
//     client.get("statuses", name, function(error, tweets, response){
//      if(!error){
//          for(var i = 0; i<tweets.length; i++){
//              var date = tweets[i].created_at;
//              console.log("Nat:" + tweets[i].text + " Created At: " + date.substring(0, 19));
//              console.log("-----------------------");

//              //adds text to log.txt file
//              fs.appendFile("log.txt" , "Nat" + tweets[i].text + " Created At; " + date.substring(0, 19));
//              fs.appendFile("log.txt", "---------------------");
//          }
//         }else{
//             console.log("Error occurred");
//         }
     
//     });
// }


  