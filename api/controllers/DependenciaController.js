/**
 * DependenciaController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	    index: function(req, res) {
		DB.navQuery(req,function(values){
			res.view(values);
		});	        
	}
};
