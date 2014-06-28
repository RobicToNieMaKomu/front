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

    var aboutContent = '<div><p>This is about content.</p></div>';
    var contactContent = '<div><p><img ng-></span>This is about content.</p></div>';

    app.controller('headerController', function() {
        console.log('header ctrl');
        this.showAbout = function() {
            BootstrapDialog.show({
                title: '<h4><b>About</b></h4>',
                message: aboutContent
            });
        };
        this.showContact = function() {
            BootstrapDialog.show({
                title: '<h4><b>Contact</b></h4>',
                message: contactContent
            });
        };
    });

    var range = ['1', '2', '3', '4'];

    var Node = function(name) {
        return {
            data: {
                id: "" + name
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

    function loadMST($scope, $http) {
        $http.get('http://front-comparator.rhcloud.com/rest/mst?range=2&type=bid').
                success(function(data) {
                    console.log(data);
                    var graph = new Graph(data);
                    var edges = graph.toEdges();
                    var nodes = graph.toNodes();
                    drawMST(nodes, edges);
                });
    }

    function Graph(data) {
        var map = data;
        var toEdges = function() {
            var edges = [];
            for (currName in map) {
                for (var i = 0; i < map[currName].length; i++) {
                    edges.push(new Edge(currName, map[currName][i]));
                }
            }
            return edges;
        };

        var toNodes = function() {
            var nodes = [];
            for (currName in map) {
                nodes.push(currName);
            }
            return nodes;
        };
    }

    function drawMST(n, e) {
        $('#cy').cytoscape({
            // these options hide parts of the graph during interaction
            //hideEdgesOnViewport: true,
            //hideLabelsOnViewport: true,

            // this is an alternative that uses a bitmap during interaction
            textureOnViewport: true,
            style: cytoscape.stylesheet()
                    .selector('node')
                    .css({
                        'width': 'mapData(weight, 0, 1, 1, 6)',
                        'height': 'mapData(weight, 0, 1, 1, 6)'
                    })
                    .selector('edge')
                    .css({
                        'opacity': '0.55',
                        'width': 'mapData(weight, 0, 100, 0.1, 1)',
                        'curve-style': 'haystack' // fast edges!
                    }),
            layout: {
                name: 'concentric',
                concentric: function() {
                    return this.data('weight');
                },
                levelWidth: function(nodes) {
                    return 10;
                },
                padding: 10
            },
            boxSelectionEnabled: false, // since we're disabling selection anyway...

            ready: function() {
                window.cy = this;
                // if we don't need selection, then this can make things a little faster in some cases
                cy.elements().unselectify();
            },
            elements: {
                nodes: n,
                edges: e
            }
        });
    }
})();