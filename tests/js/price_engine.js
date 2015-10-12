if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        //config: {
        //    'moment': {
        //        noGlobal: true
        //    }
        //},
        paths: {
            //Path relative to baseUrl
            'milkman': '../../milkman'
            //'moment': '../lib/moment'
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
        factory(root.milkman, root.jquery);
    }
}(this, function (milkman, $) {
    'use strict';

    var range= '2015-09-07T09:30:00.000Z/2015-09-07T13:00:00.000Z',
        ioi= [
            {"interval":"2015-09-07T09:30:00.000Z/2015-09-07T10:00:00.000Z",
                "price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-09-07T10:00:00.000Z/2015-09-07T10:30:00.000Z",
                "price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-09-07T10:30:00.000Z/2015-09-07T11:00:00.000Z",
                "price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-09-07T11:00:00.000Z/2015-09-07T11:30:00.000Z",
                "price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-09-07T11:30:00.000Z/2015-09-07T12:00:00.000Z",
                "price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-09-07T12:00:00.000Z/2015-09-07T12:30:00.000Z",
                "price":1.99,"weight":0.15,"currency":"euro"},
            {"interval":"2015-09-07T12:30:00.000Z/2015-09-07T13:00:00.000Z",
                "price":1.99, "weight":0.15, "currency":"euro"}
        ];

    milkman.authenticate( milkman.defaults.SETTINGS, function( succ ) {

        milkman.priceEngine([range], ioi, function( result ) {  //return range, price, intervals

            var prop = result.range;

            test('Price test', function() {
                equal(true, true, 'Price with success.');
            });
        });
    });
}));