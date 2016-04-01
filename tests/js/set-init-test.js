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
        redirectUri: 'http://www.localhost.com',
        publishableKey: 'test-public-key',
        city: 'Milano',
        postalCode: '11123',
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
    /** test con parse */
    milkman.setInit( SET_S1, function( result ) {
        test('TEST success S1:', function() {
            equal(result.status, 'success')
        });
    });
    var SET_S2 = {
        redirectUri: 'http://www.localhost.com',
        publishableKey: 'test-public-key',
        city: 'Milano',
        externalTrackingCode: 'prova_parse',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_S2, function( result ) {
        test('TEST success S2', function() {
            equal(result.status, 'success')
        });
    });

    var SET_E1 = {
        redirectUri: '',
        publishableKey: 'test-public-key',
        city: 'Milano',
        externalTrackingCode: 'prova_parse',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E1, function( result ) {
        test('TEST redirectUri SET_E1', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var  SET_E2 = {
        redirectUri: null,
        publishableKey: 'test-public-key',
        city: 'Milano',
        externalTrackingCode: 'prova_parse',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E2, function( result ) {
        test('TEST redirectUri SET_E2', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var SET_E03 = {
        redirectUri: undefined,
        publishableKey: 'test-public-key',
        city: 'Milano',
        externalTrackingCode: 'prova_parse',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E03, function( result ) {
        test('TEST redirectUri SET_E03', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var   SET_E04 = {
        publishableKey: 'test-public-key',
        city: 'Milano',
        externalTrackingCode: 'prova_parse',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };

    milkman.setInit( SET_E04, function( result ) {
        test('TEST redirectUri SET_E04', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });

    var SET_E001 = {
        redirectUri: 'http://localhost:3003',
        city: 'Milano',
        externalTrackingCode: 'prova_parse',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E001, function( result ) {
        test('TEST publishableKey SET_E001', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var SET_E002 = {
        redirectUri: 'http://localhost:3003',
        publishableKey: 'test-public-key',
        externalTrackingCode: 'prova_parse',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E002, function( result ) {
        test('TEST city SET_E002', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var SET_E003 = {
        redirectUri: 'http://localhost:3003',
        publishableKey: 'test-public-key',
        city: 'Milano',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E003, function( result ) {
        test('TEST externalTrackingCode SET_E003', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var SET_E004 = {
        redirectUri: 'http://localhost:3003',
        publishableKey: 'test-public-key',
        externalTrackingCode: 'prova_parse',
        city: 'Milano',
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E004, function( result ) {
        test('TEST subsidyCost SET_E004', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var SET_E005 = {
        redirectUri: 'http://localhost:3003',
        publishableKey: 'test-public-key',
        externalTrackingCode: 'prova_parse',
        city: 'Milano',
        subsidyCost: 2.90,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E005, function( result ) {
        test('TEST standardCost SET_E005', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });


    var SET_E00001 = {
        redirectUri: 'http://localhost:3003',
        publishableKey: 'test-public-key',
        externalTrackingCode: 'prova_parse',
        city: 'Milano',
        subsidyCost: 2.90,
        standardCost: 0,
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E00001, function( result ) {
        test('TEST firstAvailability SET_E00001', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var SET_E000002 = {
        redirectUri: 'http://localhost:3003',
        publishableKey: 'test-public-key',
        externalTrackingCode: 'prova_parse',
        city: 'Milano',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E000002, function( result ) {
        test('TEST firstAvailability SET_E000002', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var SET_E000003 = {
        redirectUri: 'http://localhost.com',
        publishableKey: 'test-public-key',
        externalTrackingCode: 'prova_parse',
        city: 'Milano',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016/01/20',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E000003, function( result ) {
        test('TEST firstAvailability SET_E000003', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var SET_E000004 = {
        redirectUri: 'http://localhost.com',
        publishableKey: 'test-public-key',
        externalTrackingCode: 'prova_parse',
        city: 'Milano',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '20/12/2016',
        pickUp: {
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV'
        }
    };
    milkman.setInit( SET_E000004, function( result ) {
        test('TEST firstAvailability SET_E000004', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var SET_E0000001 = {
        redirectUri: 'http://localhost:3003',
        publishableKey: 'test-public-key',
        externalTrackingCode: 'prova_parse',
        city: 'Milano',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00',
        pickUp: {}
    };
    milkman.setInit( SET_E0000001, function( result ) {
        test('TEST pickUp SET_E0000001', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
    var SET_E0000002 = {
        redirectUri: 'http://localhost.com',
        publishableKey: 'test-public-key',
        externalTrackingCode: 'prova_parse',
        city: 'Milano',
        subsidyCost: 2.90,
        standardCost: 0,
        firstAvailability: '2016-01-20T12:00'
    };

    milkman.setInit( SET_E0000002, function( result ) {
        test('TEST pickUp SET_E0000002', function() {
            equal(result.status, 'failure', JSON.stringify(result))
        });
    });
}));