if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'milkman': '../../milkman'
        }
    });

    //Override if in "dist" mode
    if (location.href.indexOf('-dist') !== -1) {
        //Set location of milkman to the dist location
        require.config({
            paths: {
                'milkman': '../../dist/milkman'
            }
        });
    }
}

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['../../dist/milkman', 'jquery'], factory);

    } else {
        // Browser globals
        factory(root.milkman, root.$);
    }
}(this, function (milkman, jquery) {
    'use strict';
    jquery.getJSON( '../dist/parseKeys.json', function( parseConfig ) {

        jquery.getJSON( '../dist/orderSchema.json', function( schema ) {
            milkman.createOrder( schema.order, parseConfig.keys, function( res ){
                //console.log('res: '+JSON.stringify(res));
                test('SET_A1', function() {
                    equal(res.status, 'success', res.text) });
            });
        });
    });
}));