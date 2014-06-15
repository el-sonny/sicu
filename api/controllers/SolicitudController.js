/**
 * SolicitudController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	    index: function(req, res) {
	    	console.log(req.param('id'));
	    	Solicitud.findOne({'FOLIO':parseInt(req.param('id'))},function(e,s){
	    		Dependencia.find({}).sort('name').
				console.log(s);
				//res.view({solicitud:s});
			});
        },
        search: function(req, res){
        	return res.view();
        }
};
