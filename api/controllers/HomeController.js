/**
 * HomeController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	index : function(req,res){
		Solicitud.find({}).limit(10).sort({'FECHASOLICITUD':'desc'}).populate('dependencia').exec(function(e,s){
			res.view({solicitudes:s});
		});
		
	},
};
