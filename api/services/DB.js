var async = require('async');
module.exports = { 
	navQuery : function(req,cb){
		if(req.param('vote') && req.user){
			return cb({});
		}
		var functs = [
			function(callback){
				Dependencia.find({}).sort('nombre').exec(callback);	
			},
			function(callback){
				Sector.find({}).sort('nombre').exec(callback);
			},
			function(callback){
				Estatus.find({}).sort('nombre').exec(callback);
			},
			function(callback){
				Respuesta.find({}).sort('nombre').exec(callback);
			},
		];
		async.parallel(functs,function(e,r){
			return cb({
				dependencias:r[0],
				sectores: r[1],
				statii: r[2],
				respuestas : r[3]
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
