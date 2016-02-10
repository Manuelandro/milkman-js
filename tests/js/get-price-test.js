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

    var init = {
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
                    firstAvailability: '2016-02-10T12:00',
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
        firstDay = "2016-02-10";


    milkman.setInit( init, function( setInitResult ){
        milkman.setAddress( init.address, function( addressResult ){
            setInitResult['settings'] = addressResult.settings;

            milkman.getAvailability( {firstDay: firstDay}, function( result ) {

                //setInitResult['ranges'] = result.data.date;
                //setInitResult['timeWindowsParam'] = result.data.timeWindowsParam;
                //if ( result.data.sameDayParam ){
                //    setInitResult['sameDayParam'] = result.data.sameDayParam;
                //}
                var ranges = [], hours = [];
                ranges.push("2016-02-11");
                hours.push("17:00/20:00");

                milkman.getPrice({ ranges: ranges, hours: hours }, function( getQuoteResult ){
                    setInitResult['price'] = getQuoteResult.price;
                    setInitResult['ranges'] = getQuoteResult.ranges;

                    test('SET_A1', function() {
                        equal(getQuoteResult.status, 'success', getQuoteResult.text) });
                    //test('SET_A1', function() {
                    //    equal(getQuoteResult.status, 'failure', getQuoteResult.text) });
                });
                //var ranges = [], hours = [];
                //ranges.push("2016-02-11T17:00/2016-02-11T20:00");
                //
                //milkman.getPrice({ ranges: ranges, hours: hours }, function( getQuoteResult ){
                //    setInitResult['price'] = getQuoteResult.price;
                //    setInitResult['ranges'] = getQuoteResult.ranges;
                //
                //    test('SET_A1', function() {
                //        equal(getQuoteResult.status, 'success', getQuoteResult.text) });
                //    //test('SET_A1', function() {
                //    //    equal(getQuoteResult.status, 'failure', getQuoteResult.text) });
                //});

                //var ranges = [], hours = [];
                //ranges.push("2016-02-11" );//"2016-02-15/2016-02-19");
                //hours.push("17:00/20:00", "12:00/14:00");
                //
                //milkman.getPrice({ ranges: ranges, hours: hours }, function( getQuoteResult ){
                //    setInitResult['price'] = getQuoteResult.price;
                //    setInitResult['ranges'] = getQuoteResult.ranges;
                //
                //    test('SET_A1', function() {
                //        equal(getQuoteResult.status, 'success', getQuoteResult.text) });
                //    //test('SET_A1', function() {
                //    //    equal(getQuoteResult.status, 'failure', getQuoteResult.text) });
                //});

                //var ranges = [], hours = [];
                //ranges.push("2016-02-11/2016-02-15");
                //hours.push("17:00/20:00");
                //
                //milkman.getPrice({ ranges: ranges, hours: hours }, function( getQuoteResult ){
                //    setInitResult['price'] = getQuoteResult.price;
                //    setInitResult['ranges'] = getQuoteResult.ranges;
                //
                //    test('SET_A1', function() {
                //        equal(getQuoteResult.status, 'failure', getQuoteResult.text) });
                //});
            });
        });
    });
}));