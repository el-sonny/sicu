var app = angular.module("sicu",[]);
app.controller('votesCTL',function($scope){
	var updateContent = function(obj){
		if(obj) jQuery('.down,.up').removeClass('desactive');
		obj = obj || {};
		obj.json = true;
		obj.page = jQuery('.hidden.page').text();
		jQuery.get('/',obj,function(data){
			var solicitudes = data.solicitudes
			jQuery('.panel.panel-default').each(function(i,v){
				v = jQuery(v);
				v.next().find('.status .votes strong').text(solicitudes[i].vote || "0");
				v.find('span.hidden.id').text(solicitudes[i].id);
				if(data.votes.down && data.votes.down.indexOf(solicitudes[i].id)!=-1){
					v.find('.down').addClass('desactive');
				}
				if(data.votes.up && data.votes.up.indexOf(solicitudes[i].id)!=-1){
					v.find('.up').addClass('desactive');
				}
				
			});
		});
	};
	
	jQuery('.vote-action a').on('click',function(e){
		e.preventDefault();
		var $this = $(this);
		updateContent({
			vote:$this.attr('class')
			,solicitudId:$this.parent().find('span').text()
		});
		
	})

	updateContent();
});
