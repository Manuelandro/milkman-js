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
        publishableKey: 'test-public-key',
            redirectUri: 'http://localhost:3003',
            trackingCode: 'prova123',
            cart: [
            {
                firstAvailability: '2016-01-12T12:00',
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
        ],
            address: [
            {
                address: 'Via matteo civitali, Milano, MI'
            }
        ],
            ranges: []
        },
        timeWindowsParam = {
            byMilkmanHub: true,
            selectedDate: "2016-02-24",
            selectedAfter : "13:00",
            selectedBefore : "20:00",
            gap : 60
        },
        timeWindows2Param = {
            byMilkmanHub: true,
            selectedDate: "2016-02-25",
            selectedAfter : "13:00",
            selectedBefore : "20:00",
            gap : 60
        },
        sameDayParam = {
            byMilkmanHub : true,
            selectedDate: "2016-01-12",
            selectedAfter : "17:00",//orario selezionato in "Dopo le"
            selectedBefore : "20:00",//orario selezionato "Prima delle"
            afterThen : "16:00", //inizio del "Dopo le"
            gap : 60 //intervallo tra "Dopo le" e "Prima delle"
        };




    console.log('--------------FIRST');
            milkman.setInit( init, function( setInitResult1 ) {
                milkman.setAddress( init.address, function( setAddressResult1 ) {


                    setInitResult1['settings'] = setAddressResult1.settings;

                    var ranges1 = [], hours1 = [];

                    ranges1.push(timeWindowsParam.selectedDate);
                    hours1.push(
                        timeWindowsParam.selectedAfter +'/'+
                        timeWindowsParam.selectedBefore
                    );

                    milkman.getQuote({ ranges: ranges1, hours: hours1 }, function( getQuoteResult1 ){
                        setInitResult1['price'] = getQuoteResult1.price;
                        setInitResult1['ranges'] = getQuoteResult1.ranges;

                        test('SET_B1', function() { equal(getQuoteResult1.status, 'success', getQuoteResult1.text) });
                        console.log('--------------SECOND');
                        milkman.setInit( init, function( setInitResult ) {
                            milkman.setAddress( init.address, function( setAddressResult ) {

                                setInitResult['settings'] = setAddressResult.settings;


                        var ranges = [], hours = [];

                                ranges.push(sameDayParam.selectedDate);
                                hours.push(
                                    sameDayParam.selectedAfter +'/'+
                                    sameDayParam.selectedBefore);


                        milkman.getQuote({ ranges: ranges, hours: hours }, function( getQuoteResult ){
                            setInitResult['price'] = getQuoteResult.price;
                            setInitResult['ranges'] = getQuoteResult.ranges;

                            test('SET_A1', function() { equal(getQuoteResult.status, 'success', getQuoteResult.text) });
                        });



                    });
                });
            });


            //milkman.getQuote(milkman.defaults.SET_C2, function( result ){
            //    //  result.ranges.forEach(function( val ){
            //        //console.log('getQuote: '+JSON.stringify(val));
            //    //   });
            //    //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        // res2.ranges.forEach(function( val ){
            //            //console.log('//console: '+JSON.stringify(val));
            //        //  });
            //        //console.log('price: '+JSON.stringify(res2.price));
            //
            //        test('SET_C2', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C3, function( result ){
            //    //   result.ranges.forEach(function( val ){
            //        //console.log('getQuote: '+JSON.stringify(val));
            //    //   });
            //    //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        //   res2.ranges.forEach(function( val ){
            //            //console.log('//console: '+JSON.stringify(val));
            //        //  });
            //        //console.log('price: '+JSON.stringify(res2.price));
            //        test('SET_C3', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C4, function( result ){
            //    test('SET_C4', function() {
            //        equal(result.status, 'failure', result.text)
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C5, function( result ){
            //    test('SET_C3', function() {
            //        equal(result.status, 'success', result.text)
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C6, function( result ){
            //    // result.ranges.forEach(function( val ){
            //            //console.log('getQuote: '+JSON.stringify(val));
            //    //  });
            //        //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        //res2.ranges.forEach(function( val ){
            //            //console.log('getQuote: '+JSON.stringify(val));
            //        // });
            //        //console.log('price: '+JSON.stringify(res2.price));
            //        test('SET_C6', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C7, function( result ){
            //    // result.ranges.forEach(function( val ){
            //        //console.log('getQuote: '+JSON.stringify(val));
            //    // });
            //    //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        //   res2.ranges.forEach(function( val ){
            //            //console.log('confirm: '+JSON.stringify(val));
            //        // });
            //        //console.log('price: '+JSON.stringify(res2.price));
            //        test('SET_C7', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C8, function( result ){
            //    // result.ranges.forEach(function( val ){
            //        //console.log('getQuote: '+JSON.stringify(val));
            //    // });
            //    //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        //res2.ranges.forEach(function( val ){
            //            //console.log('confirm: '+JSON.stringify(val));
            //        //});
            //        //console.log('price: '+JSON.stringify(res2.price));
            //        test('SET_C8', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C9, function( result ){
            //    //result.ranges.forEach(function( val ){
            //        //console.log('getQuote: '+JSON.stringify(val));
            //    //});
            //    //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        //  res2.ranges.forEach(function( val ){
            //            //console.log('confirm: '+JSON.stringify(val));
            //        //});
            //        //console.log('price: '+JSON.stringify(res2.price));
            //        test('SET_C9', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C10, function( result ){
            //    //result.ranges.forEach(function( val ){
            //        //console.log('getQuote: '+JSON.stringify(val));
            //    //});
            //    //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        //res2.ranges.forEach(function( val ){
            //            //console.log('confirm: '+JSON.stringify(val));
            //        //});
            //        //console.log('price: '+JSON.stringify(res2.price));
            //        test('SET_C10', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C11, function( result ){
            //    //console.log('getQuote: '+JSON.stringify(result));
            //
            //    test('SET_C11', function() {
            //        equal(result.status, 'failure', result.text)
            //    });
            //
            //});
            //milkman.getQuote(milkman.defaults.SET_C12, function( result ){
            //    //result.ranges.forEach(function( val ){
            //        //console.log('getQuote: '+JSON.stringify(val));
            //    //});
            //    //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        //res2.ranges.forEach(function( val ){
            //            //console.log('confirm: '+JSON.stringify(val));
            //        //});
            //        //console.log('price: '+JSON.stringify(res2.price));
            //        test('SET_C12', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //
            //});
            //
            //milkman.getQuote(milkman.defaults.SET_C12_bis, function( result ){
            //
            //        test('SET_C12_bis', function() {
            //            equal(result.status, 'failure', result.text)
            //        });
            //
            //});
            //
            //
            //milkman.getQuote(milkman.defaults.SET_C13, function( result ){
            //    //result.ranges.forEach(function( val ){
            //        //console.log('getQuote: '+JSON.stringify(val));
            //    //});
            //    //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        //res2.ranges.forEach(function( val ){
            //            //console.log('confirm: '+JSON.stringify(val));
            //        //});
            //        //console.log('price: '+JSON.stringify(res2.price));
            //        test('SET_C13', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C14, function( result ){
            //    //result.ranges.forEach(function( val ){
            //        //console.log('getQuote: '+JSON.stringify(val));
            //    //});
            //    //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        //res2.ranges.forEach(function( val ){
            //            //console.log('confirm: '+JSON.stringify(val));
            //        //});
            //        //console.log('price: '+JSON.stringify(res2.price));
            //        test('SET_C14', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C15, function( result ){
            //    //console.log('getQuote: '+JSON.stringify(result));
            //
            //    test('SET_C15', function() {
            //        equal(result.status, 'failure', result.text)
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C16, function( result ){
            //    //console.log('getQuote: '+JSON.stringify(result));
            //
            //        test('SET_C16', function() {
            //            equal(result.status, 'failure', result.text)
            //        });
            //
            //});
            //milkman.getQuote(milkman.defaults.SET_C17, function( result ){
            //    //result.ranges.forEach(function( val ){
            //        //console.log('getQuote: '+JSON.stringify(val));
            //    //});
            //    //console.log('price: '+JSON.stringify(result.price));
            //
            //    milkman.confirm(result, function( res2 ){
            //        //res2.ranges.forEach(function( val ){
            //            //console.log('confirm: '+JSON.stringify(val));
            //        //});
            //        //console.log('price: '+JSON.stringify(res2.price));
            //        test('SET_C17', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C18, function( result ){
            //    //console.log('getQuote: '+JSON.stringify(result));
            //
            //    test('SET_C18', function() {
            //        equal(result.status, 'failure', result.text)
            //    });
            //});
            //milkman.getQuote(milkman.defaults.SET_C19, function( result ){
            //    //console.log('getQuote: '+JSON.stringify(result));
            //
            //    test('SET_C19', function() {
            //        equal(result.status, 'success', result.text)
            //    });
            //});

        });
    });

}));