require("dotenv").config();
//Load the fs package to read and write
var fs = require ("fs");

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

//Take data from
var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var getMyTweets = function(){ 
//Display 20 last Tweets
    var client = new Twitter(keys.twitterKeys);
    var params = {
        screen_name: 'Nat97941816',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        for(var i = 0; i<tweets.length; i++){
            console.log("Created at: " + tweets[i].created_at);
            console.log(tweets[i].text);
            console.log(" ");
        }
      }else{
          console.log('Error occured');
      }
    });
} 


 var getArtistNames = function(artist){
     return artist.name;
 }
 var getMeSpotify = function(songName){
    
    var spotify = new Spotify({
        id:process.env.SPOTIFY_ID,
        secret:process.env.SPOTIFY_SECRET
    });

    var numberOfResults = 20;

    if (songName === "The+Sign+Ace+of+Base"){
        numberOfResults = 1;
    }

        spotify.search({ type: 'track', query: songName,limit:numberOfResults}, function(err, data) {
       
        console.log(data);
        
        var songs = data.tracks.items;
        
        for(var i=0; i<songs.length; i++){
            console.log[i];
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log("Preview URL: " + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('------------------------');
        }  

    });
}

var getMeMovie = function(movieName){
  request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) { 
    if(!error && response.statusCode == 200){
     var jsonData = JSON.parse(body);
     
     console.log('Title: ' + jsonData.Title);
     console.log('Year: ' + jsonData.Year);
     console.log('IMDB Rating: ' + jsonData.imdbRating);
     console.log('Rotten Tomatoes rating: ' + jsonData.Ratings[1].Value);
     console.log('Coutry: ' + jsonData.Country);
     console.log('Language: ' + jsonData.Language);
     console.log('Plot: ' + jsonData.Plot);
     console.log('Actors: ' + jsonData.Actors);
    }    
  });
}
    

var doWhatItSays = function(){
    fs.readFile('random.txt', 'utf8', function (err, data){
        if (err) throw err;
        var dataArr = data.split(','); 
        getMeSpotify(dataArr[1]);
        
        if (dataArr.length == 2){
            pick(dataArr[0], dataArr[1]);
        }else if(dataArr.length == 1) {
            pick(dataArr[0]);
        }        
    });
}    
//Switch case statment
var pick = function(caseData, functionData){
    console.log(functionData);
  switch(caseData){
    case "my-tweets":
        getMyTweets();
        break;

    case "spotify-this-song":
    var x =" ";
    if (process.argv[3]){
        console.log("if the user has pased an argument")
    getMeSpotify(functionData);
    }
    else{ 
        if(x){
            getMeSpotify("The+Sign+Ace+of+Base"); 
        }
    }
         break; 
    case 'movie-this':
    if (process.argv[3]){
        getMeMovie(functionData);
    } 
    else {
        if (process.argv[3] != null) {
            getMeMovie(functionData);
        }
        else {
            const movieName = "Mr+Nobody";
            console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
            getMeMovie(movieName);
        }
    }   
    break;    
    case 'do-what-it-says':
    doWhatItSays();
    break;      
    default:
    console.log('Liri does not know that');    
  }
}

var runThis = function(argOne, argTwo){
pick(argOne,argTwo);
};

runThis(process.argv[2], process.argv[3]);



    


    

  