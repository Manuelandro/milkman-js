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

    //var SET_S1 = {
    //        redirectUri: 'http://www.localhost.it',
    //        publishableKey: 'test-public-key',
    //        city: 'Milano',
    //        externalTrackingCode: 'prova_parse',
    //        subsidyCost: 2.90,
    //        standardCost: 0,
    //        firstAvailability: '2016-01-20T12:00',
    //        pickUp: {
    //            hubId: '',
    //            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
    //            lat: 45.188835,
    //            lng: 9.153518,
    //            note: ''
    //        }
    //    },
    //    SET_B1 =[{
    //        address: 'Via matteo civitali, Milano, MI'
    //    }],
    //    TODAY = '2015-04-05';


    var address = [{
            //addressId:,
            address:'Via matteo civitali, Milano, MI',
            lat:'',
            lng:'',
            //heading:'',
            //pitch:'',
            deliverInstructions:''
        }],
        cart ={ pickUp: {
            hubId: '',
            address: 'Via San Gerolamo Miani, 15 27100 Pavia PV',
            lat: 45.188835,
            lng: 9.153518,
            note: ''
        }},
        session = {
            redirectUri:'http://localhost:3003',
            publishableKey:'test-public-key',
            city:'Milano',
            postalCode: '11123',
            externalTrackingCode: 'prova_parse',
            subsidyCost: 0,
            standardCost: 0,
            sameDay: false,
            deliveryType:'sameDay',
            consignee: {
                firstName: 'fra',
                lastName: 'bab',
                email: 'fra.bnarb@gmail.com'
            }
        };
    var initialParams = {};

    initialParams['redirectUri'] = session.redirectUri;
    initialParams['publishableKey'] = session.publishableKey;
    initialParams['city'] = session.city;
    initialParams['postalCode'] = session.postalCode;
    initialParams['externalTrackingCode'] = session.externalTrackingCode;
    initialParams['subsidyCost'] = session.subsidyCost;
    initialParams['standardCost'] = session.standardCost;
    initialParams['pickUp'] = cart.pickUp;
    initialParams['consignee'] = session.consignee;

    var today = new Date(),
        formatToday = '2016-04-06T12:00';

    initialParams['firstAvailability'] = formatToday;

    /** test con parse */
    //$.ajax({
    //    url : 'https://api.parse.com/1/functions/setInit',
    //    headers: {
    //        "X-Parse-Application-Id": "JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
    //        "X-Parse-Javascript-Key": "bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
    //    },
    //    type: 'POST',
    //    data : JSON.stringify(initialParams),
    //    dataType: "json",
    //    timeout: 8000,
    //    success: function(data, textStatus, jqXHR)
    //    {
    //        test('TEST createOrder', function() {  equal('success', 'success') });
    //        console.log('success: '+data.result);
    //    },
    //    error: function(data)//jqXHR, textStatus, errorThrown)
    //    {
    //        test('TEST createOrder', function() {  equal('error', 'error') });
    //        var error = JSON.parse(data.responseText);
    //        console.log('error: '+error.error);
    //    }
    //});
    milkman.setInit( initialParams, function( ) {

        console.log('setInit ');
        milkman.setAddress( address, function( ) {
            console.log('setAddress ');
            milkman.getAvailability( {}, function( result ) {
                console.log('getAvailability1 ');
                test('CASE 1: NOTHING', function() {
                    equal(result.status, 'success')
                });
            });

            milkman.getAvailability( {firstDay: today}, function( result ) {
                console.log('getAvailability2 ');
                console.log('result: '+JSON.stringify(result.data.date));
                test('CASE 2: FIRST DAY', function() {
                    equal(result.status, 'success')
                });
            });

            milkman.getAvailability( {numberOfDays: 11}, function( result ) {
                console.log('getAvailability3 ');
                test('CASE 3: NUMBER OF DAYS', function() {
                    equal(result.status, 'success')
                });
            });
        });
    });

}));