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
        factory(root.milkman, root.jquery);
    }
}(this, function (milkman, $) {
    'use strict';

    //verifico che se passo range senza [] lo inserisce la funzione
    milkman.setInit( milkman.defaults.SETTINGS_1, function( result, moment ) {

        var object1 = {},
            object2 = { range: '2015-10-28'},
            object3 = { range: '2015-10-28T17:00'},
            object4 = { range: ['2015-10-28/2015-11-28']},
            object5 = { range: ['2015-10-28', '2015-11-28/2015-11-28', '2015-10-27T17:00/2015-10-27T19:00']};

        //TEST 1, no range
        //milkman.getQuote(object1, function( res ){
        //    console.log('res1 with quotation: '+JSON.stringify(res));
        //    milkman.getQuote(object1, function( res ){
        //        console.log('res2 without quotation: '+JSON.stringify(res));
        //        test('test 1 object = {}', function() {
        //            equal(JSON.stringify(res), JSON.stringify(res), result.text)
        //        });
        //    });
        //});

        //TEST 2, range day
        milkman.getQuote(object5, function( res1 ){
            milkman.getQuote(object5, function( res2 ){
                //milkman.confirm(res2.ranges, res2.price, function( isEqual ){
                //    console.log('res2 without quotation: '+isEqual);
                    test('test 1 object = {}', function() {
                        equal(JSON.stringify(res1), JSON.stringify(res2), result.text)
                    });
                //});
            });
        });

    });
}));














