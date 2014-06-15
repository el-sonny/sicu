/**
 * DependenciaController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    index: function(req, res) {
		Dependencia.findOne({'nombre':req.param('nombre')}).exec(function(e,d){
			Solicitud.count({'DEPENDENCIA':req.param('nombre')}).exec(function(err,ns){
				DB.navQuery(req,function(values){
					values.dependencia = d;
					values.nSolicitudes = ns;
					res.view(values);
				});	
			});
		});
    }
};
