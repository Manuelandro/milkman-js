if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'milkman': '../milkman'
        }
    });

    //Override if in "dist" mode
    if (location.href.indexOf('-dist') !== -1) {
        //Set location of milkman to the dist location
        require.config({
            paths: {
                'milkman': '../dist/milkman'
            }
        });
    }
}

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['../dist/milkman', 'jquery'], factory);

    } else {
        // Browser globals
        factory(root.milkman, root.jquery);
    }
}(this, function (milkman, $) {
    'use strict';
    var new_interval1 = "2015-09-07T09:30:00.000Z/2015-09-07T10:00:00.000Z", // one interval
        new_interval2 = "2015-09-07T09:30:00.000Z/2015-09-07T11:30:00.000Z", // three intervals
        new_interval3 = "2015-09-07T09:30:00.000Z/2015-09-12T13:00:00.000Z", // different days, error
        new_interval4 = "2015-09-07T07:00:00.000Z/2015-09-07T08:30:00.000Z"; // no result

    milkman.authenticate( milkman.defaults.SETTINGS, function() {

        milkman.constants.quotes = '';

        //CREO NUOVO EVENTO: con intervalli che ho in locale
        milkman.newEvent( new_interval1, function( result1 ){
            console.log('result1: '+result1.price);
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
        milkman.newEvent( new_interval3, function( result3 ){
            test('newEvent: different days test', function() {
                equal(result3.success, false, result3.text+' '+result3.message);
            });
        });
        milkman.newEvent( new_interval4, function( result4 ){
            test('newEvent: no result test', function() {
                equal(result4.success, false, result4.text);
            });
        });
    });



}));