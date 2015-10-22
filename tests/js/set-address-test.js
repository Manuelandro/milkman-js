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

    milkman.setInit( milkman.defaults.SETTINGS_1, function( result, moment ) {

        var settedAddress = {
            address: '22 Oak Ln, Rumson, NJ 07760, Stati Uniti',
            lat: 40.372186,
            lng: -74.01118099999997,
            heading: 36.94424778789316,
            pitch: -6.11509517212225,
            deliverInstructions: 'Beware the dog'
        };


        milkman.setAddress(settedAddress, function( res ){
            console.log('res: '+JSON.stringify(res));

            test('test 1 object = {}', function() {
                equal(true, true, result.text)
            });
        });

    });
}));