var express = require('express');
var StellarSdk = require('stellar-sdk');
var bodyparser = require('body-parser');
var config = require('config');
var TwitterPackage = require('twitter');
var tables = require('./config/bookshelf');
var ExitError = require('./config/exiterror');
var makeTweet = require('./config/maketweet');
var errorObj = [];
global.allUsers = [];

var secret = {
  consumer_key: 'KEY-HERE',
  consumer_secret: 'KEY-HERE',
  access_token_key: 'KEY-HERE',
  access_token_secret: 'KEY-HERE'
};
var Twitter = new TwitterPackage(secret);

var server = new StellarSdk.Server(config.get('test'));
var app = express();


app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  next();
});
// Get all users

tables.records.forge().fetch()
	.then(function(models) {
		console.log("models", models.toJSON());
		allUsers = models.toJSON();
	})
	.catch(function(error) {
		console.log("eers", error);
	});

// App routes
app.get('/',  function(req, res) {
	res.status(200).send({message: "Home Page"});
});

app.post('/subscribe',  function(req, res) {
	// check if twitter user is valid
	// check if public key is valid
	// save details in db
	var userObj = {username: req.body.username, account_id: req.body.accountID};
	errorObj = [];

	if (!StellarSdk.Keypair.isValidPublicKey(userObj.account_id)) {
		res.status(400).send({message: "Invalid Key"});	
		return false;
	} 

	//check if it is a valid user 
	Twitter.get('users/show',  {screen_name: userObj.username})
	.then(function (tweet) {
		console.log(tweet);
		// username exists - check if already subscribed
			
		return tables.record.forge(userObj).fetch();
	})
	.catch(function (error) {
		// throw error user does not exist;
		console.log("Twitter error: ", error);
		errorObj.push("Twitter username is Invalid");
		throw new ExitError();
		
	})
	.then(function(model) {
		// model found?
		if (model) {
			console.log("model exists", model.toJSON());
			errorObj.push("Already subscribed");	
			throw new ExitError();
		} else{
			// save to db
			
			return tables.record.forge(userObj).save();	
		};
	})
	.catch(function (error) {
		// db error;
		if (error instanceof ExitError) {
			console.log("errorObj", errorObj);
			throw new ExitError();
			// res.status(400).send({error: errorObj});
			return null;
		} else{
			console.log("DB Error", error);
		errorObj.push("Unable to subscribe you. Please try again");
		throw new ExitError();

		};

	})
	.then(function(model) {
		// saved to db .. add to global users object;
		// return success message
		allUsers.push(model.toJSON());
		res.status(200).send({message: "Subscription successful", allUsers: allUsers});	
		
	})
	.catch(function (error) {
		// could not save to db
		if (error instanceof ExitError) {
			console.log("errorObj", errorObj);
			throw new ExitError();
			// return null;
		} else{
			console.log("CDB Error: ", error);
			errorObj.push("Unable to subscribe you. Please try again");
			throw new ExitError();
		}
	})
	.catch(function (error) {
		// final error handler
		console.log("2nd error");
		console.log("errorObj", errorObj);
		res.status(400).send({error: errorObj, allUsers: allUsers});
		return null;
  	
		
	});
	
});


// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(8888,  function() {
// 	console.log('Server started on '+httpsServer.address().port);
// });



var opStream = server.operations()
                        .cursor('now')
                        .stream({
                          onmessage: tweetOp,
                          onerror: errorLog
                        });


function tweetOp (ops) {
	// focus on payments
	// check if account id is in list
	// if so prepare tweet/dm and send 
	console.log("Tweet rec", ops);
	var match = {};
	match = makeTweet.findMatchingUser(allUsers,ops);

	if (match.usernames.length > 0) {
		// user subscription found
		// prepare tweet
		match.usernames.forEach(function(u) {
			var tweetObj = {
												screen_name: u.username,
												text: match.text
											};
			Twitter.post('direct_messages/new', tweetObj)
		  .then(function (tweet) {
		    console.log(tweet);
		  })
		  .catch(function (error) {
		    console.log("error: ", error);
		  });

		});

	} else{
		console.log("No matching subscription found:\n", match);
	};

}                       
function errorLog (error) {
	console.log("Error", error);
}                     


var server = app.listen(8888, function() {
  console.log('Server listening on port ' + server.address().port);
});                     
