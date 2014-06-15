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
		if(req.param('text')) params.DESCRIPCIONSOLICITUD = {contains : req.param('text')};
		var page = req.param('page') ? req.param('page') : 0;
		DB.navQuery(req,function(values){
			vote(req,res,function(voteup,votedown){
				Solicitud.count(params).exec(function(e,count){
					Solicitud.find().where(params).sort({'FECHASOLICITUD':'desc'}).paginate({page:page}).exec(function(e,solicitudes){
						values.pagination = {};
						values.pagination.pages = Math.ceil(count/10);
						values.pagination.page = page;
						values.pagination.start = page - 2 >= 1 ? page - 2 : 1;
						values.pagination.base = '?'
						values.pagination.base += params.dependencia ? 'dependencia='+params.dependencia+'&' : '';
						values.pagination.base += params.sector ? 'sector='+params.sector+'&' : '';
						values.pagination.base += params.estatus ? 'status='+params.estatus+'&' : '';
						values.pagination.base += 'page=';
						values.solicitudes = solicitudes;
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
				});
			});
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
