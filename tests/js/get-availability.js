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

    var SET_A1 = {
            redirectUri: 'http://localhost:3003',
            publishableKey: 'test-public-key',
            city: 'Milano',
            trackingCode: 'prova_parse',
            cart: {
                subsidyCost: 0.00,
                standardCost: 10.00,
                parcels: [
                    {
                        weight: 12.47,
                        firstAvailability: '2016-01-20T12:00',
                        value: 100,
                        pickUp: {
                            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
                            heading: 36.94424778789316,
                            pitch: -6.11509517212225,
                            lat: 45.188835,
                            lng: 9.153518
                        }
                    }
                ]
            }
        },
        SET_B1 =[
            {
                address: 'Via matteo civitali, Milano, MI'
            }
        ],
        TODAY = new Date();


    /** test con parse */
    milkman.setInit( SET_A1, function( prova ) {
        milkman.setAddress( SET_B1, function( result ) {
            milkman.getAvailability( {}, function( result ) {
                test('TEST A1: p.key + uri + track. no cart', function() {
                    equal(result.status, 'success')
                });
            });

            milkman.getAvailability( {firstDay: TODAY}, function( result ) {
                test('TEST A1: p.key + uri + track. no cart', function() {
                    equal(result.status, 'success')
                });
            });

            milkman.getAvailability( {numberOfDays: 11}, function( result ) {
                test('TEST A1: p.key + uri + track. no cart', function() {
                    equal(result.status, 'success')
                });
            });
        });
    });

}));