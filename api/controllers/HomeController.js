/**
 * HomeController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	index : function(req,res){
		var params = {};
		if(req.param('dependencia')) params.dependencia = req.param('dependencia');
		if(req.param('sector')) params.sector = req.param('sector');
		if(req.param('status')) params.estatus = req.param('status');
		DB.navQuery(req,function(values){
			Solicitud.find().where(params).limit(10).sort({'FECHASOLICITUD':'desc'}).exec(function(e,solicitudes){
				values.solicitudes = solicitudes;
				res.view(values);
			});
		});
	},
};
