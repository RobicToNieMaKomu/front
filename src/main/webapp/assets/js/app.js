(function() {
    var app = angular.module('mstGrapher', []);

    app.controller('mstController', function($scope, $http) {
        console.log('mstController!');
        this.scope = $scope;
        this.http = $http;
        this.timeRanges = range;
        this.generateMST = function() {
            console.log('cytoscape!!!');
            loadMST(this.scope, this.http);
        };
    });
    app.controller('headerController', function() {
        console.log('header ctrl');
        this.showAbout = function() {
            var info = new Info('about');
            BootstrapDialog.show({
                title: info.getTitle(),
                message: info.getMessage()
            });
        };
        this.showContact = function() {
            var info = new Info('contact');
            BootstrapDialog.show({
                title: info.getTitle(),
                message: info.getMessage()
            });
        };
    });
    var range = ['1', '2', '3', '4'];

    function loadMST($scope, $http) {
        $http.get('http://front-comparator.rhcloud.com/rest/cores').
                success(function(data) {
                    data = getDummy();
                    console.log(data);
                    var graph = new Graph(data);
                    var edges = graph.toEdges(data);
                    var nodes = graph.toNodes(data);
                    console.log('edges:' + edges);
                    console.log('nodes:' + nodes);
                    new Grapher(n, e).draw(nodes, edges);
                });
    }
    function getDummy() {
        return {
            PLN: ['USD', 'EUR', 'AUD', 'CHF'],
            USD: ['PLN'],
            EUR: ['PLN'],
            AUD: ['PLN'],
            CHF: ['PLN', 'NOK'],
            NOK: ['CHF']
        };
    }

    function Graph(data) {
        var map = data;
        var Node = function(name) {
            return {
                data: {
                    id: "" + name,
                    name: name
                }};
        };
        var Edge = function(src, tgt) {
            return {
                data: {
                    id: "" + src + tgt,
                    weight: 10,
                    source: src,
                    target: tgt
                }};
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
})();