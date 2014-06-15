/**
 * SolicitudController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
module.exports = {
	    index: function(req, res) {
			Solicitud.findOne({'FOLIO':parseInt(req.param('id'))}).exec(function(e,s){
				/*var rp = Referencia_periodistica.find().where({'solicitud':}).exec(function(e,rp){
					return rp;
				});*/
				DB.navQuery(req,function(values){
					values.solicitud = s;
					//values.referencias_periodisticas = rp;console.log(rp);
					console.log(s);
					res.view(values);
				});	
			});
        },
        search: function(req, res){
        	return res.view();
        },
        addarticle : function(req, res){
        	console.log(typeof req.user);
        	/*if( typeof req.user != 'undefined' && req.param('text') && req.param('text') != '' ){
        		Referencia_periodistica.create({
	        		user : req.user.profile.username,
	        		text : req.param('text')
	        	}).done(function(){
	        		res.redirect('/solicitud/index/' + req.param('id'));
	        	});
        	}else{
        		res.redirect('/solicitud/index/' + req.param('id'));
        	}*/
        }
};