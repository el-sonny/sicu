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
		var page = req.param('page') ? req.param('page') : 0;

		DB.navQuery(req,function(values){
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
					res.view(values);
				});
			});			
		});
	},
};
