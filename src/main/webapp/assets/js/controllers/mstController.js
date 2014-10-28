angular.module('mstGrapher').controller(
		'mstController',
		[
				'$scope',
				'$http',
				'$modal',
				function($scope, $http, $modal) {
					console.log('mstController!');
					var range = [ 'two recent changes', 'today' ];
					this.scope = $scope;
					this.http = $http;
					this.timeRanges = range;
					this.span = this.timeRanges[0];
					this.generateMST = function() {
						console.log('cytoscape!!!');
						loadMST(this.scope, this.http,
								spanTxtToValue(this.span), true);
					};
					this.roles = [ 'guest', 'user', 'customer', 'admin' ];
					this.user = {
						roles : [ 'user' ]
					};
					this.showCurrModal = function() {

						var modalInstance = $modal.open({
							templateUrl : 'modal.html',
							controller : function() {
							}
						});
					};
					this.setSpan = function(event) {
						console.log(event);
						this.span = event;
					};
					var spanTxtToValue = function(span) {
						var result;
						if (range[1] === span) {
							result = 1;
						} else if (range[2] === span) {
							result = 2;
						} else if (range[3] === span) {
							result = 7;
						} else {
							result = 0;
						}
						return result;
					};
					// initial request
					loadMST(this.scope, this.http, spanTxtToValue(this.span));
				} ]);

function loadMST($scope, $http, span, showDial) {
	var currencies = new Currencies().mostPopular();
	var dial = (showDial === true) ? BootstrapDialog
			.show({
				title : '<h4><b>Operation in progess</b></h4>',
				type : 'type-warning',
				message : 'It may take from few seconds up to one minute during a first call</br></br> This window will be closed automatically.'
			})
			: null;
	var grapher = new Grapher();
	grapher.showLoadingTxt();
	$http.get(
			'http://front-comparator.rhcloud.com/rest/mst?type=ask&range='
					+ span + '&currencies=' + currencies).success(
			function(data) {
				grapher.hideLoadingTxt();
				console.log(data);
				(dial !== null) ? dial.close() : null;
				var graph = new Graph(data);
				var edges = graph.toEdges(data);
				var nodes = graph.toNodes(data);
				console.log('edges:' + edges);
				console.log('nodes:' + nodes);
				grapher.draw(nodes, edges);
			});
}

function Graph(data) {
	var map = data;
	var Node = function(name) {
		return {
			data : {
				id : "" + name,
				name : name
			}
		};
	};
	var Edge = function(src, tgt) {
		return {
			data : {
				id : "" + src + tgt,
				weight : 10,
				source : src,
				target : tgt
			}
		};
	};
	this.toEdges = function() {
		var output = [];
		var edges = [];
		for (currName in map) {
			for (var i = 0; i < map[currName].length; i++) {
				var src = currName;
				var tgt = map[currName][i];
				if (edges.indexOf(tgt + src) === -1) {
					edges.push(src + tgt);
					output.push(new Edge(src, tgt));
				}
			}
		}
		return output;
	};
	this.toNodes = function() {
		var nodes = [];
		for (currName in map) {
			nodes.push(new Node(currName));
		}
		return nodes;
	};
}

function Currencies() {
	function Currency(name, selected) {
		this.name = name;
		this.selected = selected;
	}
	var popularCurrenciesInOrder = [ "USD", "EUR", "GBP", "INR", "AUD", "CAD",
			"AED", "MYR", "CHF", "CNY", "THB", "SAR", "NZD", "JPY", "SGD",
			"PHP", "TRY", "HKD", "IDR", "ZAR", "MXN", "SEK", "BRL", "HUF",
			"PKR", "QAR", "OMR", "KWD", "DKK", "NOK", "RUB", "EGP", "KRW",
			"COP", "CZK" ];
	this.topTen = function() {
		var tenCurr = popularCurrenciesInOrder.slice(0, 10);
		return appendCommas(tenCurr);
	};
	this.mostPopular = function() {
		return appendCommas(popularCurrenciesInOrder);
	};
	var appendCommas = function(array) {
		var output = '';
		for (var i = 0; i < array.length; i++) {
			output = output + array[i];
			if (i !== (array.length - 1)) {
				output = output + ',';
			}
		}
		return output;
	};
	this.selected = [];
	this.onSelect = function(curr) {
	};
	this.showSelected = function() {
		var html = '<div><p>';
		html += '</p></div>';
	};
}