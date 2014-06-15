/**
 * SolicitudController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	    index: function(req, res) {
	    	Solicitud.find({FOLIO:req.param('id')}).exec(function(e,s){
				//res.view({solicitud:s});
				console.log(s);
			});
        },
        search: function(req, res){
        	return res.view();
        }
};
