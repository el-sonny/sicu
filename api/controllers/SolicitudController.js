/**
 * SolicitudController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	    index: function(req, res) {
			Solicitud.findOne({'FOLIO':parseInt(req.param('id'))}).populate('recursos_revision').exec(function(e,s){
				DB.navQuery(req,function(values){
					values.solicitud = s;
					res.view(values);
				});	
			});
        },
        search: function(req, res){
        	return res.view();
        }
};