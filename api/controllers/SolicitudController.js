/**
 * SolicitudController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	    index: function(req, res) {
			Solicitud.findOne({'FOLIO':parseInt(req.param('id'))}).populate('recursos_revision').exec(function(e,s){
				Dependencia.find({}).sort('nombre').exec(function(e,d){
					Sector.find({}).sort('nombre').exec(function(e,sec){
						Estatus.find({}).sort('nombre').exec(function(e,stat){
							res.view({
								solicitud:s,
								dependencias:d,
								sectores: sec,
								statii: stat,
							});
						});
					});
					
				});
			});
        },
        search: function(req, res){
        	return res.view();
        }
};