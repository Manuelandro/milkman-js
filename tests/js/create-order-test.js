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
    var init = {
            redirectUri: 'http://localhost:3003',
            publishableKey: 'test-public-key',
            city: 'Milano',
            trackingCode: 'prova_create_order',
            cart: {
                subsidyCost: 0.00,
                standardCost: 10.00,
                parcels: [
                    {
                        weight: 12.47,
                        firstAvailability: '2016-02-23T12:00',
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
            },
            address: [
                {
                    address: 'Via matteo civitali, Milano, MI'
                }
            ],
            ranges: []
        },
        firstDay = "2016-02-23",
        order = {
            createBy: 'timedefined',
            trackingCode: 'prova_parse',
            privateKey: 'test-private-key',
            paymentMethod: 'cc'
        };

    milkman.setInit( init, function( setInitResult ){
        test('TEST setInit', function() {  equal(setInitResult.status, 'success') });
        milkman.setAddress( init.address, function( addressResult ){
            test('TEST setAddress', function() {  equal(addressResult.status, 'success') });
            setInitResult['settings'] = addressResult.settings;
            milkman.getAvailability( {firstDay: firstDay}, function( availabilityResult ) {
                test('TEST getAvailability', function() {  equal(availabilityResult.status, 'success') });
                var ranges= [ "2016-02-23T14:00/2016-02-23T16:00" ];
                //ranges.push("2016-02-23T14:00/2016-02-23T16:00");
                //hours.push("14:00/16:00");
                //milkman.getPrice({ ranges: ranges }, function( getQuoteResult ){
                //    test('TEST getPrice', function() {  equal(getQuoteResult.status, 'success') });
                //    order['ranges'] = getQuoteResult.ranges;
                //    order['additionalCost'] = getQuoteResult.additionalCost;
                order['sessionId'] = window.localStorage.getItem( 'session_token' );
                order['proposalId'] = window.localStorage.getItem( 'proposal_id' );
                order['ranges'] = ranges;
                order['additionalCost'] = 3.90;
                    $.ajax({
                        url : 'https://api.parse.com/1/functions/createOrder',
                        headers: {
                            "X-Parse-Application-Id": "JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
                            "X-Parse-Javascript-Key": "bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
                        },
                        type: 'POST',
                        data : JSON.stringify(order),
                        dataType: "json",
                        timeout: 8000,
                        success: function(data, textStatus, jqXHR)
                        {
                            test('TEST createOrder', function() {  equal('success', 'success') });
                            console.log('success: '+data.result);
                        },
                        error: function(data)//jqXHR, textStatus, errorThrown)
                        {
                            test('TEST createOrder', function() {  equal('error', 'error') });
                            var error = JSON.parse(data.responseText);
                            console.log('error: '+error.error);
                        }
                    });
                });
            //});
        });
    });
}));