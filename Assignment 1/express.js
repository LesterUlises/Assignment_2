var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');
const { userInfo } = require('os');
const { text } = require('body-parser');


//global variable for tweet data
var tweetinfo = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweetinfo : tweetinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({tweetinfo : tweetinfo});
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  res.send({tweetinfo : tweetinfo});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  var tweet = req.body.text; //assigns the text to tweet
  const idTweet = tweet.split(";"); //Splits the input into 2 arrays
  var date = new Date(); //created a time function

  tweetinfo.push({ //Pushes this new info onto the array
    user: {id: idTweet[0]}, //assigns the user to the fist half of the split array
    text: idTweet[1], //assignes the text to the second hald of the spily array 
    created_at: date, //assignes the created_at to the data function for current time
  })
  res.send('Created Tweet: '+ tweet +'.'); //This is for testing for making sure console was outputting the correct values
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
  var tweetID = req.body.number; //assigns the ID passed to this function to TweetID
  var found = false; //For false to make sure if found do this...
  var find = 0; //Vaule for find, will be updated if found 
  var ID; //Local ID, Text, and Created vaules 
  var Text;
  var Created;

  tweetinfo.forEach(function(tweetinfo) { //This goes through each part of the array tweetinfo
    if (!found && (tweetinfo.user.id == tweetID)){ //If not found and the input is equal to a vaule in the array tweet info do this
      find = 1; //set the find vaule to 1
      ID = tweetinfo.user.id; //copys the local ID, Text, Created to those vaules at the array location
      Text = tweetinfo.text;  
      Created = tweetinfo.created_at;
      res.send('Searched for Tweet: '+ ID +'.' + Created); //outputting to broswer console to make sure it is outputting the correct info
    }
  });
  if(find == 0){ // If find equal to 0 do this
    res.send('Could not find Tweet: '+ tweetID +'.'); //Will send out to the console that the ID could not be found
  }
  else if(find ==1){ // If find vaule is 1 do this
    tweetinfo.push({ // It will push this new assigned vaules to the array tweetinfo
      created_at: Created,
      user: {id: ID},
      text: Text,
    })
  }
});

//Update
app.put('/tweets/:name', function(req, res) {
  //TODO: update names
  var name = req.params.name; //assignes vaules to local function 
  var newName =  req.body.newName;
  var found = false;

  tweetinfo.forEach(function(tweetinfo) {//for each loop
    if (!found && (tweetinfo.user.name == name)){ // If not found do this
      tweetinfo.user.screen_name = newName; //assigns new screen name to the old screen name
      res.send("New name: "+ newName + " has replaced the name: "+ name); //Cosole output to test if everything is working
    }
  });
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet
  var tweetid = req.params.tweetid; //assignes vaules to local function
  var found = false;
  res.send("Deleted: "+ tweetid + "."); //Console testing to make sure what was being deleted is correct
  tweetinfo.forEach(function(tweetinfo) { //For each loop
    if (!found && tweetinfo.user.id == tweetid){ //If found do this
      tweetinfo.user.id = " "; //set these vaules to " " so that they appear as deleted
      tweetinfo.text = " ";
      tweetinfo.created_at = " ";
    }
  });

});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});