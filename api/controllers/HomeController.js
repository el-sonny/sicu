/**
 * HomeController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	index : function(req,res){
		Solicitud.find({}).limit(10).sort({'FECHASOLICITUD':'desc'}).populate('dependencia').exec(function(e,s){
			Dependencia.find({}).sort('nombre').exec(function(e,d){
				res.view({solicitudes:s,dependencias:d});
			});
		});
		
	},
};
