/**
 * SolicitudController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	    index: function(req, res) {
	    	//Solicitud.findOne({'FOLIO':parseInt(req.param('id'))},function(e,s){
	    	Solicitud.findOne({'FOLIO':parseInt(req.param('id'))}).populate('recursos_revision').exec(function(e,s){
				/*console.log(s.recursos_revision);
				console.log(s.recursos_revision[0]);
				console.log('File: ' + s.ARCHIVORESPUESTA);*/
				Dependencia.find({}).sort('nombre').exec(function(e,d){
					//res.view({solicitud:s,recursos:y,dependencias:d});
					res.view({solicitud:s,dependencias:d});
				});
			});
        },
        search: function(req, res){
        	return res.view();
        }
};