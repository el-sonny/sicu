/**
 * TwitterController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');
module.exports = {
	 auth: passport.authenticate('twitter')

	, callback: passport.authenticate('twitter',{
			  successRedirect: '/twitter/success'
			, failureRedirect: '/twitter/login'
		})
	, login:function(req,res){
		res.json('logueate to /twitter/auth');
	}
	, success: function(req,res){
		res.json(req.user)
	}
};
