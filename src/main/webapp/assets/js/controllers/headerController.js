angular.module('mstGrapher').controller('headerController', function() {
	console.log('header ctrl');
	this.showAbout = function() {
		var info = new Info('about');
		BootstrapDialog.show({
			title : info.getTitle(),
			message : info.getMessage()
		});
	};
	this.showContact = function() {
		var info = new Info('contact');
		BootstrapDialog.show({
			title : info.getTitle(),
			message : info.getMessage()
		});
	};
});