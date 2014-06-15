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
			vote(req,res,function(voteup,votedown){
				Solicitud.find().where(params).limit(10).sort({'FECHASOLICITUD':'desc'}).exec(function(e,solicitudes){
					values.solicitudes = solicitudes;
					
					console.log(req.user);
					if(req.param('json'))
						res.json({
							solicitudes:solicitudes
							, votes:{
								up: voteup || req.user && req.user.voteup || []
								,down:votedown || req.user && req.user.votedown || []
							}
						});
					else
						res.view(values);
				});
			})
		});
	},
};

function vote(req,res,cb){
	if(req.param('vote') && req.user){
		Twitter.findOne({nombre:req.user.profile.username}).exec(function(err,user){
			if(err) throw err;
			var solicitudId = req.param('solicitudId')
			, mode = 'vote'+req.param('vote');
			user[mode] = user[mode] || [];
			if(user[mode].indexOf(solicitudId)==-1){
				user[mode].push(solicitudId);
				var modeDelete = mode=='voteup'?'votedown':'voteup'
				, deleteItem;
				user[modeDelete] = user[modeDelete] || [];
				if((deleteItem = user[modeDelete].indexOf(solicitudId))!=-1){
					user[modeDelete].splice(deleteItem,1);
				}
				user.save(function(err){
					if(err) throw err;
					Solicitud.findOne({id:solicitudId}).exec(function(err,solicitud){
						if(solicitud.vote== undefined){
							solicitud.vote = 0;
						}
						if(mode=='voteup')
							solicitud.vote++;
						else
							solicitud.vote--;
						solicitud.save(function(err){
							if(err) throw err;
							//res.json(solicitudes);
							cb(user.voteup,user.votedown);
						});
					});
				});
			}
		});
	}else{
		cb();
	}
}
