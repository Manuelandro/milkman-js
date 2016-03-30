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
        factory(root.milkman, root.$);
    }
}(this, function (milkman, jquery) {
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
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            hubId: '',
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
            lat: 45.188835,
            lng: 9.153518,
            note: ''
        }
        };
        //SET_S2 = {
        //    redirectUri: 'http://localhost:3003',
        //    publishableKey: 'test-public-key',
        //    postalCode: '',
        //    city: 'Milano',
        //    externalTrackingCode: 'prova_parse',
        //    cart:
        //    {
        //        subsidyCost: 2.90,
        //        standardCost: 0,
        //        parcels:
        //            [{
        //                firstAvailableDay: '2016-01-20T12:00',
        //                pickUp: {
        //                    address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
        //                }
        //            }]
        //    }
        //};
        //SET_E1 = {
        //    redirectUri: '',
        //    publishableKey: 'test-public-key',
        //    postalCode: '',
        //    city: 'Milano',
        //    externalTrackingCode: 'prova_parse',
        //    cart:
        //    {
        //        subsidyCost: 2.90,
        //        standardCost: 0,
        //        parcels:
        //            [{
        //                firstAvailableDay: '2016-01-20T12:00',
        //                pickUp: {
        //                    address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
        //                }
        //            }]
        //    }
        //},
        //SET_E2 = {
        //    redirectUri: 'http://localhost:3003',
        //    publishableKey: '',
        //    postalCode: '',
        //    city: 'Milano',
        //    externalTrackingCode: 'prova_parse',
        //    cart:
        //    {
        //        subsidyCost: 2.90,
        //        standardCost: 0,
        //        parcels:
        //            [{
        //                firstAvailableDay: '2016-01-20T12:00',
        //                pickUp: {
        //                    address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
        //                }
        //            }]
        //    }
        //},
        //SET_E3 = {
        //    redirectUri: 'http://localhost:3003',
        //    publishableKey: 'test-public-key',
        //    postalCode: '',
        //    city: '',
        //    externalTrackingCode: 'prova_parse',
        //    cart:
        //    {
        //        subsidyCost: 2.90,
        //        standardCost: 0,
        //        parcels:
        //            [{
        //                firstAvailableDay: '2016-01-20T12:00',
        //                pickUp: {
        //                    address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
        //                }
        //            }]
        //    }
        //},
        //SET_E4 = {
        //    redirectUri: 'http://localhost:3003',
        //    publishableKey: 'test-public-key',
        //    postalCode: '',
        //    city: 'Milano',
        //    externalTrackingCode: '',
        //    cart:
        //    {
        //        subsidyCost: 2.90,
        //        standardCost: 0,
        //        parcels:
        //            [{
        //                firstAvailableDay: '2016-01-20T12:00',
        //                pickUp: {
        //                    address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
        //                }
        //            }]
        //    }
        //},
        //SET_E5 = {
        //    redirectUri: 'http://localhost:3003',
        //    publishableKey: 'test-public-key',
        //    postalCode: '',
        //    city: 'Milano',
        //    externalTrackingCode: 'prova_parse',
        //    cart:
        //    {
        //        subsidyCost: null,
        //        standardCost: 0,
        //        parcels:
        //            [{
        //                firstAvailableDay: '2016-01-20T12:00',
        //                pickUp: {
        //                    address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
        //                }
        //            }]
        //    }
        //},
        //SET_E6 = {
        //    redirectUri: 'http://localhost:3003',
        //    publishableKey: 'test-public-key',
        //    postalCode: '',
        //    city: 'Milano',
        //    externalTrackingCode: 'prova_parse',
        //    cart:
        //    {
        //        subsidyCost: 5,
        //        standardCost: null,
        //        parcels:
        //            [{
        //                firstAvailableDay: '2016-01-20T12:00',
        //                pickUp: {
        //                    address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
        //                }
        //            }]
        //    }
        //},
        //SET_E7 = {
        //    redirectUri: 'http://localhost:3003',
        //    publishableKey: 'test-public-key',
        //    postalCode: '',
        //    city: 'Milano',
        //    externalTrackingCode: 'prova_parse',
        //    cart:
        //    {
        //        subsidyCost: 5,
        //        standardCost: 0,
        //        parcels:
        //            [{
        //                firstAvailableDay: '',
        //                pickUp: {
        //                    address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
        //                }
        //            }]
        //    }
        //},
        //SET_E8 = {
        //    redirectUri: 'http://localhost:3003',
        //    publishableKey: 'test-public-key',
        //    postalCode: '',
        //    city: 'Milano',
        //    externalTrackingCode: 'prova_parse',
        //    cart:
        //    {
        //        subsidyCost: 5,
        //        standardCost: 0,
        //        parcels:
        //            [{
        //                firstAvailableDay: '2016-01-20T12:00',
        //                pickUp: {
        //                    address: '',
        //                }
        //            }]
        //    }
        //},
        //SET_E9 = {
        //    redirectUri: 'http://localhost:3003',
        //    publishableKey: 'test-public-key',
        //    postalCode: '',
        //    city: 'Milano',
        //    externalTrackingCode: 'prova_parse',
        //    cart:
        //    {
        //        subsidyCost: 5,
        //        standardCost: 0
        //    }
        //},
        //SET_E10 = {
        //    redirectUri: 'http://localhost:3003',
        //    publishableKey: 'test-public-key',
        //    postalCode: '',
        //    city: 'Milano',
        //    externalTrackingCode: 'prova_parse'
        //};

    /** test con parse */
    milkman.setInit( SET_S1, function( result ) {
        test('TEST SET_S1:', function() {
                equal(result.status, 'success')
            });
        });
    //milkman.setInit( SET_S2, function( result ) {
    //    test('TEST SET_S2', function() {
    //        equal(result.status, 'success')
    //    });
    //});
    //
    //milkman.setInit( SET_E1, function( result ) {
    //    test('TEST SET_E1', function() {
    //        equal(result.status, 'failure', JSON.stringify(result))
    //    });
    //});
    //milkman.setInit( SET_E2, function( result ) {
    //    test('TEST SET_E2', function() {
    //        equal(result.status, 'failure', JSON.stringify(result))
    //    });
    //});
    //milkman.setInit( SET_E3, function( result ) {
    //    test('TEST SET_E3', function() {
    //        equal(result.status, 'failure', JSON.stringify(result))
    //    });
    //});
    //milkman.setInit( SET_E4, function( result ) {
    //    test('TEST SET_E4', function() {
    //        equal(result.status, 'failure', JSON.stringify(result))
    //    });
    //});
    //milkman.setInit( SET_E5, function( result ) {
    //    test('TEST SET_E5', function() {
    //        equal(result.status, 'failure', JSON.stringify(result))
    //    });
    //});
    //milkman.setInit( SET_E6, function( result ) {
    //    test('TEST SET_E6', function() {
    //        equal(result.status, 'failure', JSON.stringify(result))
    //    });
    //});
    //milkman.setInit( SET_E7, function( result ) {
    //    test('TEST SET_E7', function() {
    //        equal(result.status, 'failure', JSON.stringify(result))
    //    });
    //});
    //milkman.setInit( SET_E8, function( result ) {
    //    test('TEST SET_E8', function() {
    //        equal(result.status, 'failure', JSON.stringify(result))
    //    });
    //});
    //milkman.setInit( SET_E9, function( result ) {
    //    test('TEST SET_E9', function() {
    //        equal(result.status, 'failure', JSON.stringify(result))
    //    });
    //});
    //milkman.setInit( SET_E10, function( result ) {
    //    test('TEST SET_E10', function() {
    //        equal(result.status, 'failure', JSON.stringify(result))
    //    });
    //});
}));