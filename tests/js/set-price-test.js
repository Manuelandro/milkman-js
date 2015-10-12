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

        var intervals =
            [{"interval":"2015-10-28T09:00:00.000Z/2015-10-28T09:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T09:30:00.000Z/2015-10-28T10:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T10:00:00.000Z/2015-10-28T10:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T10:30:00.000Z/2015-10-28T11:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T11:00:00.000Z/2015-10-28T11:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T11:30:00.000Z/2015-10-28T12:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T12:00:00.000Z/2015-10-28T12:30:00.000Z","price":1.99,"weight":0.15,"currency":"euro"},
            {"interval":"2015-10-28T12:30:00.000Z/2015-10-28T13:00:00.000Z","price":1.99,"weight":0.15,"currency":"euro"},
            {"interval":"2015-10-28T13:00:00.000Z/2015-10-28T13:30:00.000Z","price":1.99,"weight":0.15,"currency":"euro"},
            {"interval":"2015-10-28T13:30:00.000Z/2015-10-28T14:00:00.000Z","price":1.99,"weight":0.15,"currency":"euro"},
            {"interval":"2015-10-28T14:00:00.000Z/2015-10-28T14:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T14:30:00.000Z/2015-10-28T15:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T15:00:00.000Z/2015-10-28T15:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T15:30:00.000Z/2015-10-28T16:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T16:00:00.000Z/2015-10-28T16:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T16:30:00.000Z/2015-10-28T17:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T17:00:00.000Z/2015-10-28T17:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-28T17:30:00.000Z/2015-10-28T18:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T09:00:00.000Z/2015-10-29T09:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T09:30:00.000Z/2015-10-29T10:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T10:00:00.000Z/2015-10-29T10:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T10:30:00.000Z/2015-10-29T11:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T11:00:00.000Z/2015-10-29T11:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T11:30:00.000Z/2015-10-29T12:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T12:00:00.000Z/2015-10-29T12:30:00.000Z","price":1.99,"weight":0.15,"currency":"euro"},
            {"interval":"2015-10-29T12:30:00.000Z/2015-10-29T13:00:00.000Z","price":1.99,"weight":0.15,"currency":"euro"},
            {"interval":"2015-10-29T13:00:00.000Z/2015-10-29T13:30:00.000Z","price":1.99,"weight":0.15,"currency":"euro"},
            {"interval":"2015-10-29T13:30:00.000Z/2015-10-29T14:00:00.000Z","price":1.99,"weight":0.15,"currency":"euro"},
            {"interval":"2015-10-29T14:00:00.000Z/2015-10-29T14:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T14:30:00.000Z/2015-10-29T15:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T15:00:00.000Z/2015-10-29T15:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T15:30:00.000Z/2015-10-29T16:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T16:00:00.000Z/2015-10-29T16:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T16:30:00.000Z/2015-10-29T17:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T17:00:00.000Z/2015-10-29T17:30:00.000Z","price":1.99,"weight":0.85,"currency":"euro"},
            {"interval":"2015-10-29T17:30:00.000Z/2015-10-29T18:00:00.000Z","price":1.99,"weight":0.85,"currency":"euro"}];

        var object = {
            range: ['2015-10-28', '2015-10-29', '2015-10-20T09:00/2015-10-20T08:00']
        };

        milkman.getQuote(object, function( res ){

            console.log('res: '+res.text);

            test('authenticate test SETTINGS', function() {
                equal(true, true, result.text)
            });

        });
    });
}));














