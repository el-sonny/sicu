/**
 * SolicitudController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	    index: function(req, res) {
			Solicitud.findOne({'id':req.param('id')}).exec(function(e,s){
				if(e) throw(e);
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