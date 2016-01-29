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
        publishableKey: 'test-public-key',
        redirectUri: 'http://localhost:3003',
        trackingCode: 'prova_parse',
        city: 'Milano',
        cart: [
            {
                firstAvailability: '2016-01-20T12:00',
                value: 100,
                auxCost: 5.5,
                weight: 12.47,
                pickUp: {
                    address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
                    heading: 36.94424778789316,
                    pitch: -6.11509517212225,
                    lat: 45.188835,
                    lng: 9.153518
                }
            }
        ]
        },
        SET_B1 = {
            address: 'Via matteo civitali, Milano, MI'
        };

    /** test con parse */
    milkman.setInit( SET_A1, function() {
        milkman.setAddress( SET_B1, function( result ) {
            test('TEST A1: p.key + uri + track. no cart', function() {
                equal(result.status, 'success')
            });
        });
    });


    //milkman.setInit( milkman.defaults.SET_A5, function( ) {
    //    milkman.setAddress( milkman.defaults.SET_B1, function( result ) {
    //        test('test SET_B1', function() {
    //            equal(result.status, 'success', result.text)
    //        });
    //    });
    //});
    //milkman.setInit( milkman.defaults.SET_A5, function( ) {
    //    milkman.setAddress( milkman.defaults.SET_B2, function( result ) {
    //        test('test SET_B2', function() {
    //            equal(result.status, 'success', result.text)
    //        });
    //    });
    //});
    //milkman.setInit( milkman.defaults.SET_A5, function( ) {
    //    milkman.setAddress( milkman.defaults.SET_B3, function( result ) {
    //        test('test SET_B3', function() {
    //            equal(result.status, 'warning', result.text)
    //        });
    //    });
    //});
    //milkman.setInit( milkman.defaults.SET_A5, function( ) {
    //    milkman.setAddress( milkman.defaults.SET_B4, function( result ) {
    //        test('test SET_B4', function() {
    //            equal(result.status, 'success', result.text)
    //        });
    //    });
    //});
    //milkman.setInit( milkman.defaults.SET_A5, function( ) {
    //    milkman.setAddress( milkman.defaults.SET_B5, function( result ) {
    //        test('test SET_B5', function() {
    //            equal(result.status, 'failure', result.text)
    //        });
    //    });
    //});
    //milkman.setInit( milkman.defaults.SET_A5, function( ) {
    //    milkman.setAddress( milkman.defaults.SET_B6, function( result ) {
    //        test('test SET_B6', function() {
    //            equal(result.status, 'success', result.text)
    //        });
    //    });
    //});
    //milkman.setInit( milkman.defaults.SET_A5, function( ) {
    //    milkman.setAddress( milkman.defaults.SET_B7, function( result ) {
    //        test('test SET_B7', function() {
    //            equal(result.status, 'warning', result.text)
    //        });
    //    });
    //});
    //milkman.setInit( milkman.defaults.SET_A5, function( ) {
    //    milkman.setAddress( milkman.defaults.SET_B8, function( result ) {
    //        test('test SET_B8', function() {
    //            equal(result.status, 'failure', result.text)
    //        });
    //    });
    //});
    //milkman.setInit( milkman.defaults.SET_A5, function( ) {
    //    milkman.setAddress( milkman.defaults.SET_B9, function( result ) {
    //        test('test SET_B9', function() {
    //            equal(result.status, 'failure', result.text)
    //        });
    //    });
    //});
}));