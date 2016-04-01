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
            redirectUri: 'http://www.localhost.it',
            publishableKey: 'test-public-key',
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
        },
        SET_B1 =[{
            address: 'Via matteo civitali, Milano, MI'
        }],
        TODAY = '2015-04-05';


    /** test con parse */
    milkman.setInit( SET_S1, function( ) {
        milkman.setAddress( SET_B1, function( ) {
            milkman.getAvailability( {firstDay: TODAY}, function( result ) {

                var data = {
                    createBy: 'timedefined',
                    externalTrackingCode: '100093683',
                    privateKey: 'test-private-key',
                    paymentMethod: 'cc',
                    range: '2015-04-05T12:00/2015-04-05T18:00',
                    additionalCost: 1.90
                };

                $.ajax({
                      url : 'https://test.api.milkman.it/v1/createOrder',
                    type: 'POST',
                    data : JSON.stringify(data),
                    dataType: "json",
                    timeout: 8000,
                    success: function(data, textStatus, jqXHR)
                    {
                        test('CASE1 FIRST DAY', function() {  equal('success', 'success') });
                    },
                    error: function(data)//jqXHR, textStatus, errorThrown)
                    {
                        var error = JSON.parse(data.responseText);
                        console.log('error: '+error.error);
                        test('CASE1 FIRST DAY', function() {  equal('success', 'error') });
                    }
                });
            });
        });
    });

}));