function Grapher() {
    this.showLoadingTxt = function() {
        $('#cy').append("<strong>Loading data...</strong>");
    };
    this.hideLoadingTxt = function() {
        $('#cy').html('');
    };
    this.draw = function(n, e) {
        $('#cy').cytoscape({
            textureOnViewport: true,
            style: cytoscape.stylesheet()
                    .selector('node')
                    .css({
                        'content': 'data(name)',
                        'text-valign': 'center',
                        'color': 'white',
                        'text-outline-width': 2,
                        'text-outline-color': '#888'
                    })
                    .selector('edge')
                    .css({
                        //'curve-style': 'haystack' // fast edges but kinda sucks
                    }).selector('.faded')
                    .css({
                        'opacity': 0.25,
                        'text-opacity': 0
                    }),
            layout: {
                name: 'breadthfirst',
                concentric: function() {
                    return this.data('weight');
                },
                levelWidth: function(nodes) {
                    return 10;
                },
                padding: 10
            },
            boxSelectionEnabled: false,
            ready: function() {
                window.cy = this;
                cy.elements().unselectify();
            },
            elements: {
                nodes: n,
                edges: e
            }
        });
    };
}