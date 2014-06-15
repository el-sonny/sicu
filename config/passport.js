var passport = require('passport')
, twitter = require('passport-twitter').Strategy
, twitter_keys = {
	  consumerKey: '7rchLSR07fPcpUe5A6ksyZaCi'
	, consumerSecret: '2VA32kSl0bUb7C5i0brtYkcO4MSftTbwobrrCfiPIHCdiACmMk'
	, callbackURL: 'http://projects.spaceshiplabs.com:1442/twitter/callback'
};

passport.use(new twitter(twitter_keys,function(token,tokenSecret,profile,done){
	var user = {
		 token:token
		,tokenSecret:tokenSecret
		,profile:profile
	}
	done(null,user);
}));

passport.serializeUser(function(user, done){
	var tmp = {
		nombre:user.profile.username
	};

	Twitter.findOrCreate(tmp,tmp).exec(function(err,twitter){

	});
	
	done(null, user);
});
   
passport.deserializeUser(function(id, done){
	Twitter.findOne({nombre:id.profile.username}).exec(function(err,user){
		id.voteup = user.voteup || [];
		id.votedown = user.votedown || [];
		done(null,id);
	});
});

module.exports = {
	express:{
		customMiddleware: function(app){
			app.use(passport.initialize());
			app.use(passport.session());
		}

	}
};
