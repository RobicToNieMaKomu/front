(function() {
    var app = angular.module('mstGrapher', []);

    app.controller('mstController', function($scope, $http) {
        console.log('mstController!');
        this.scope = $scope;
        this.http = $http;
        this.timeRanges = range;
        this.generateMST = function() {
            console.log('cytoscape!!!');
            console.log('$scope:' + this.scope);
            console.log('$http:' + this.http);
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

    var Edge = function(i) {
        return {
            data: {
                id: "" + i + (i + 1),
                weight: 10,
                source: i,
                target: i + 1
            }};
    };

    function loadMST($scope, $http) {
        $http.get('http://front-comparator.rhcloud.com/rest/mst?range=1&type=bid').
                success(function(data) {
                    console.log('wohoo!');
                    console.log(data);
                    var edges = toEdges(data);
                    var nodes = toNodes(data);
                    drawMST(nodes, edges);
                });
    }
    
    function toEdges(data) {
    }
    
    function toNodes(data) {
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