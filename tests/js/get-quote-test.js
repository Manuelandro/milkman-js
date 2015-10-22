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

        //var merchant_weekdays = [true, true, true, true, true, false, false];
        var object = {
            range:[
                //'2015-10-26/2015-10-29',
                '2015-10-30T09:00/2015-10-30T15:00',
                //'2015-10-31',
                //'2015-11-02'
            ],
            weekdays: [ 1, 3, 5, 6 ],
            hours: [ '09:30/10:00', '13:30/14:00' ]

            //morning: true,
            //afternoon: true
        };

        milkman.getQuote(object, function( results ){

            console.log('results: '+JSON.stringify( results ));

            test('authenticate test SETTINGS', function() {
                equal(true, true, result.text)
            });

        });

    });

}));