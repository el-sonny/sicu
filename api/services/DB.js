var async = require('async');
module.exports = { 
	navQuery : function(req,cb){
		var params = {};
		if(req.param('dependencia')) params.dependencia = req.param('dependencia');
		if(req.param('sector')) params.sector = req.param('sector');
		if(req.param('status')) params.estatus = req.param('status');
		Solicitud.find().where(params).limit(10).sort({'FECHASOLICITUD':'desc'}).exec(function(e,s){
			Dependencia.find({}).sort('nombre').exec(function(e,d){
				Sector.find({}).sort('nombre').exec(function(e,sec){
					Estatus.find({}).sort('nombre').exec(function(e,stat){
						cb({
							solicitudes:s,
							dependencias:d,
							sectores: sec,
							statii: stat,
						});
					});
				});
				
			});
		});
		
	},
	extract : function(old_field,new_field,object,limit){
		console.log('field',old_field);
		Solicitud.count(function(err,n){
			limit = limit || 500;
			if(err) throw err;
			var count = Math.round(n/limit)
			, skip = 0
			, range = [];
			for(var i=0;i<=count;i++){
				range.push(skip);
				skip += limit;
			}
			async.eachSeries(range,function(i,cb1){
				Solicitud.find().skip(i).limit(limit).exec(function(err,objects){
					if(err) throw err;
					async.eachSeries(objects,function(v,cb){
						object.findOrCreate({nombre:v[old_field]},{nombre:v[old_field]}).exec(function(err,new_obj){
							if(err) throw err;
							var obj = {};
							obj[new_field] = new_obj.id;
							updateSolicitud(v.id,obj,cb);
						});
					}
					,function(err){
						if(err) throw err;
						console.log(old_field+' limit:'+i);
						cb1();
					});
				});
			},function(err){
				if(err) throw err;
				console.log('finish:'+old_field);
			});

			//}
		});

	}
	,extractAll:function(){
		//this.extract('DEPENDENCIA','dependencia',Dependencia);
		this.extract('ESTATUS','estatus',Estatus);
		this.extract('MEDIOENTRADA','medioentrada',Medioentrada);
		this.extract('MEDIOENTREGA','medioentrega',Medioentrega);
		this.extract('RESPUESTA','respuesta',Respuesta);
		this.extract('SECTOR','sector',Sector);
		this.extract('TIPOSOLICITUD','tiposolicitud',Tiposolicitud);
	}
};

function updateSolicitud(id,obj,cb){
	Solicitud.update({id:id},obj).exec(function(err,item){
		if(err) throw err;
		//console.log(item);
		return cb && cb();
	});
}
