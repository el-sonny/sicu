var passport = require('passport')
, Twitter = require('passport-twitter').Strategy
, twitter_keys = {
	  consumerKey: '7rchLSR07fPcpUe5A6ksyZaCi'
	, consumerSecret: '2VA32kSl0bUb7C5i0brtYkcO4MSftTbwobrrCfiPIHCdiACmMk'
	, callbackURL: 'http://127.0.0.1:1339/twitter/callback'
};

passport.use(new Twitter(twitter_keys,function(token,tokenSecret,profile,done){
	var user = {
		 token:token
		,tokenSecret:tokenSecret
		,profile:profile
	}
	done(null,user);
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
   
passport.deserializeUser(function(id, done) {
	done(null,id);
});

module.exports = {
	express:{
		customMiddleware: function(app){
			app.use(passport.initialize());
			app.use(passport.session());
		}

	}
};
