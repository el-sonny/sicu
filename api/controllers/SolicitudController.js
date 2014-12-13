/**
 * SolicitudController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
module.exports = {
	    index: function(req, res) {
			Solicitud.findOne({'id':req.param('id')}).populate('referencias_periodisticas').exec(function(e,s){
				if(e) throw(e);
				DB.navQuery(req,function(values){
					values.solicitud = s;
					res.view(values);
				});	
			});
        },
        search: function(req, res){
        	return res.view();
        },
        addarticle : function(req, res){
        	//console.log(typeof req.user);
        	if( typeof req.user != 'undefined' && req.param('text') && req.param('text') != '' ){
        		Referencia_periodistica.create({
	        		user : req.user.profile.username,
	        		solicitud : req.param('id'),
	        		text : req.param('text')
	        	},function( err , referencia_periodistica ){
	        		if(err)
	        			console.log(err);
	        		else
	        			res.redirect('/solicitud/index/' + req.param('id'));
	        	});
        	}else{
        		res.redirect('/solicitud/index/' + req.param('id'));
        	}
        }
};