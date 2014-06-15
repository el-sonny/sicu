var async = require('async');
module.exports = { 
	extractDependencia : function(){
		console.log(1)
		Solicitud.count(function(err,n){
			if(err) throw err;
			var count = Math.round(n/10000)
			, skip = 0;
			//for(var i=0;i<count;i++){
				Solicitud.find().skip(skip).limit(100).exec(function(err,solicitud){
					if(err) throw err;
					solicitud.forEach(function(v){
						Dependencia.findOrCreate({nombre:v.DEPENDENCIA},{nombre:v.DEPENDENCIA}).exec(function(err,dependencia){
							if(err) throw err;
							Solicitud.update({id:v.id},{dependencia:dependencia.id}).exec(function(err,so){
								if(err) throw err;
								console.log(so);
							});
						});
					});
				});
				skip += 10000;
			//}
		});
	},
	extract : function(old_field,new_field,object,limit){
		console.log('field',old_field);
		return 1;
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
