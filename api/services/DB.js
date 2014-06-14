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
	extract : function(old_field,new_field,object){
		Solicitud.count(function(err,n){
			if(err) throw err;
			var count = Math.round(n/10000)
			, skip = 0;
			//for(var i=0;i<count;i++){
				Solicitud.find().skip(skip).limit(100).exec(function(err,objects){
					if(err) throw err;
					objects.forEach(function(v){
						object.findOrCreate({nombre:v[old_field]},{nombre:v[old_field]}).exec(function(err,new_obj){
							if(err) throw err;
							Solicitud.update({id:v.id},{new_obj:new_obj.id}).exec(function(err,item){
								if(err) throw err;
								console.log(item);
							});
						});
					});
				});
				skip += 10000;
			//}
		});

	}
}

