if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'milkman': '../../milkman',
            'default_data': '../../milkman/Utils/defaults'
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
        define(['../../dist/milkman', 'default_data', 'jquery'], factory);

    } else {
        // Browser globals
        factory(root.milkman, root.default_data, root.jquery);
    }
}(this, function (milkman, default_data, $) {
    'use strict';
    var new_interval1 = ["2015-09-07T09:30:00.000Z/2015-09-07T10:00:00.000Z"], // one interval
        new_interval2 = ["2015-09-07T09:30:00.000Z/2015-09-07T11:30:00.000Z"]; // three intervals

    var range, price;
    //var range= '2015-09-07T09:30:00.000Z/2015-09-07T13:00:00.000Z',
    //    ioi= [
    //        {"interval":"2015-09-07T09:30:00.000Z/2015-09-07T10:00:00.000Z",
    //            "price":1.99,"weight":0.85,"currency":"euro"},
    //        {"interval":"2015-09-07T10:00:00.000Z/2015-09-07T10:30:00.000Z",
    //            "price":1.99,"weight":0.85,"currency":"euro"},
    //        {"interval":"2015-09-07T10:30:00.000Z/2015-09-07T11:00:00.000Z",
    //            "price":1.99,"weight":0.85,"currency":"euro"},
    //        {"interval":"2015-09-07T11:00:00.000Z/2015-09-07T11:30:00.000Z",
    //            "price":1.99,"weight":0.85,"currency":"euro"},
    //        {"interval":"2015-09-07T11:30:00.000Z/2015-09-07T12:00:00.000Z",
    //            "price":1.99,"weight":0.85,"currency":"euro"},
    //        {"interval":"2015-09-07T12:00:00.000Z/2015-09-07T12:30:00.000Z",
    //            "price":1.99,"weight":0.15,"currency":"euro"},
    //        {"interval":"2015-09-07T12:30:00.000Z/2015-09-07T13:00:00.000Z",
    //            "price":1.99, "weight":0.15, "currency":"euro"}
    //    ];

    milkman.authenticate( milkman.defaults.SETTINGS, function( succ ) {

        //CREO NUOVO EVENTO: con intervalli che ho in locale
        milkman.newEvent( new_interval1, function( result1 ){
            console.log('result1: '+result1.price);
            range = result1.range;
            price = result1.price;
            test('newEvent: one interval test', function() {
                equal(result1.success, true, result1.text);
            });
        });
        milkman.newEvent( new_interval2, function( result2 ){
            console.log('result2: '+result2.price);

            test('newEvent: three intervals test', function() {
                equal(result2.success, true, result2.text);
            });
        });
        //milkman.priceEngine([range], ioi, function( result ) {  //return range, price, intervals
        //
        //    var intervals_tmp = result.range,
        //        price = result.price;


            //var intervals_tmp = "2015-09-07T09:30:00.000Z/2015-09-07T13:00:00.000Z",
            //    price = 0.1194;

            milkman.confirm(range, price, function( val ){
                test('confirm test', function() {
                    equal(val.success, true, 'Commit with success. '); });
            });
        //});
    });




}));