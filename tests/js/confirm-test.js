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

        var object5 = { range: ['2015-10-28', '2015-11-28/2015-11-28', '2015-10-27T17:00/2015-10-27T19:00']};

        milkman.confirm(object5, function( res2 ){
            console.log('res2 without quotation: '+res2);
            test('confirm', function() {
                equal(true, true, result.text)
            });
        });

    });
}));




