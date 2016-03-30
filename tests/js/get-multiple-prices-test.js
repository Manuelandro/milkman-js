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
    //var object = {
    //    range:[
    //        '2015-12-14T09:01/2015-12-14T09:55'
    //    ],
    //    weekdays: [ 1, 3, 5, 6 ],
    //    hours: [ '09:30/10:00', '13:30/14:00' ]
    //};

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
        TODAY = '2015-03-30';


    milkman.setInit( SET_S1, function( ){
        milkman.setAddress( SET_B1, function( ){

            milkman.getAvailability( {firstDay: TODAY}, function( ) {
                milkman.getMultiplePrices({ date: TODAY }, function( getQuoteResult ){

                    test('SET_A1', function() {
                        equal(getQuoteResult.status, 'success',
                            JSON.stringify(getQuoteResult));
                    });
                });
            });
        });
    });
}));