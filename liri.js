require("dotenv").config();
var keys = require("keys.js");


var spotify = new Spotify(keys.spotify);

function mytweets() {
  var Twitter = require("twitter");
  var client = new Twitter(keys.twitter);
  var params = {screen_name: 'Khalil21442699'}
  var collect = ""

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for (var tweet in tweets) {
              collect += "Tweet Text: " + tweets[tweet].text + "| Created at: " + tweets[tweet].created_at + "\n";
          }

          logOut("Tweets", collect);
      }
    })
}

function spotifythissong(song) {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);

  if (!song) {
      var song = "The Sign";
  }

  spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      logOut("Song", 
      "Song Name: " + data.tracks.items[0].name + "\n" +
      "Artist Name: " + data.tracks.items[0].name + "\n" +
      "Preview: " + data.tracks.items[0].preview_url + "\n" +
      "Album: " + data.tracks.items[0].album.name + "\n"
      );
    });
}

function thisMovie(movieName) {
  var request = require('request');
  
  if (!movieName) {
      var movieName = "Mr. Nobody";
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=4516440d";
  
  request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
          logOut("Movie", 
              "Title of the movie: "  + JSON.parse(body).Title + "\n" +
              "The movie's rating is: " + JSON.parse(body).imdbRating + "\n" +
              "The movie was released in: " + JSON.parse(body).Year + "\n" + 
              "IMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\n" +
              "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n" +
              "The country produced in was: " + JSON.parse(body).Country + "\n" +
              "The movie's language was: "  + JSON.parse(body).Language + "\n" +
              "The movie plot was: "  + JSON.parse(body).Plot + "\n" +
              "The actors in the movie were: "  + JSON.parse(body).Actors + "\n"
          );
      }
  });
}

function doWhat() {
  var fs = require("fs");
  
  fs.readFile("random.txt", "utf8", function(error, data) {

      if (error) {
          return console.log(error);
      }
      
      var dataArr = data.split(",");
      command = dataArr.splice(0, 1)[0];
      param = dataArr[0];

      run(command, param);
  });
}