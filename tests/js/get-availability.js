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

    var SET_S1 = {
            redirectUri: 'http://localhost:3003',
            publishableKey: 'test-public-key',
            postalCode: '',
            city: 'Milano',
            externalTrackingCode: 'prova_parse',
            cart:
            {
                subsidyCost: 2.90,
                standardCost: 0,
                parcels:
                    [{
                        weight: 0,
                        firstAvailableDay: '2016-01-20T12:00',
                        value: 100,
                        pickUp: {
                            hubId: '',
                            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
                            lat: 45.188835,
                            lng: 9.153518,
                            note: ''
                        },
                        length: 0,
                        depth: 0,
                        volume: 0,
                        height: 0
                    }]
            }
        },
        SET_B1 =[
            {
                address: 'Via matteo civitali, Milano, MI'
            }
        ],
        TODAY = '2015-02-09';


    /** test con parse */
    milkman.setInit( SET_S1, function( ) {
        milkman.setAddress( SET_B1, function( ) {
            milkman.getAvailability( {}, function( result ) {
                test('CASE 1: NOTHING', function() {
                    equal(result.status, 'success')
                });
            });

            milkman.getAvailability( {firstDay: TODAY}, function( result ) {
                console.log('result: '+JSON.stringify(result.data.date));
                test('CASE 2: FIRST DAY', function() {
                    equal(result.status, 'success')
                });
            });

            milkman.getAvailability( {numberOfDays: 11}, function( result ) {
                test('CASE 3: NUMBER OF DAYS', function() {
                    equal(result.status, 'success')
                });
            });
        });
    });

}));