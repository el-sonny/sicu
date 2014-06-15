/**
 * DependenciaController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    index: function(req, res) {
		Dependencia.findOne({'nombre':req.param('nombre')}).exec(function(e,d){
			DB.navQuery(req,function(values){
				values.dependencia = d;
				res.view(values);
			});	
		});
    }
};
