var app = angular.module("sicu",['ui.bootstrap']);

app.controller("datepickerCTL", function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
   
});

app.controller('votesCTL',function($scope){
	var updateContent = function(obj){
		if(obj) jQuery('.down,.up').removeClass('desactive');
		obj = obj || {};
		obj.json = true;
		jQuery.get('/',obj,function(data){
			var solicitudes = data.solicitudes
			console.log(data.votes);
			jQuery('.panel.panel-default').each(function(i,v){
				console.log(v,solicitudes[i].id);
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
