module.exports.extractDependencia = function(){
	console.log(1)
	Solicitud.count(function(err,n){
		if(err) throw err;
		var count = Math.round(n/10000)
		, skip = 0;
		//for(var i=0;i<count;i++){
			Solicitud.find().skip(skip).limit(10000).exec(function(err,solicitud){
				if(err) throw err;
				solicitud.forEach(function(v){
					Dependencia.findOrCreate({nombre:v.DEPENDENCIA},{nombre:v.DEPENDENCIA}).exec(function(err,dependencia){
						if(err) throw dependencia;
						console.log(dependencia);
						//Solicitud.findOne({v.id});
					});
				});
			});
			skip += 10000;
		//}
	})
};
