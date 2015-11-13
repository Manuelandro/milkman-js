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

    window.localStorage.removeItem('addresses');
    window.localStorage.removeItem('default_range');
    window.localStorage.removeItem('hub');
    window.localStorage.removeItem('merchant');
    window.localStorage.removeItem('proposal_id');
    window.localStorage.removeItem('publishable_key');
    window.localStorage.removeItem('redirect_uri');
    window.localStorage.removeItem('session_token');

    milkman.setInit( milkman.defaults.SET_A5, function( ) {
        milkman.setAddress( milkman.defaults.SET_B2, function( result ) {
            //var merchant_weekdays = [true, true, true, true, true, false, false];
            var object = {
                range:[
                    '2015-12-14T08:01/2015-12-14T08:55'
                ]//,
                //weekdays: [ 1, 3, 5, 6 ],
                //hours: [ '09:30/10:00', '13:30/14:00' ]
            };

            milkman.getQuote(object, function( result ){
                test('authenticate test SETTINGS', function() {
                    equal(result.status, 'success', result.text)
                });
            });

        });
    });

}));