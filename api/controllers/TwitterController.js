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
			  successRedirect: '/'
			, failureRedirect: '/twitter/loginError'
		})
	, loginError:function(req,res){
		res.json('error al iniciar');
	}
	, success: function(req,res){
		res.json(req.user)
	}
	, logout: function(req,res){
		req.logout();
		res.redirect('/');
	}
};
