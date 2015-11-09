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

    milkman.setInit( milkman.defaults.SETTINGS_1, function( ) {

        milkman.setAddress( milkman.defaults.CHECK_SETT_ADDRESS_1, function( result ) {
            test('test 1 CHECK_SETT_ADDRESS_1', function() {
                equal(result.success, true, result.text)
            });
        });
        milkman.setAddress( milkman.defaults.CHECK_SETT_ADDRESS_2, function( result ) {
            test('test 1 CHECK_SETT_ADDRESS_2', function() {
                equal(result.success, true, result.text)
            });
        });
        milkman.setAddress( milkman.defaults.CHECK_SETT_ADDRESS_3, function( result ) {
            test('test 1 CHECK_SETT_ADDRESS_3', function() {
                equal(result.success, true, result.text)
            });
        });
        milkman.setAddress( milkman.defaults.CHECK_SETT_ADDRESS_4, function( result ) {
            test('test 1 CHECK_SETT_ADDRESS_4', function() {
                equal(result.success, true, result.text)
            });
        });
        milkman.setAddress( milkman.defaults.CHECK_SETT_ADDRESS_ERR1, function( result ) {
            test('test 1 CHECK_SETT_ADDRESS_ERR1', function() {
                equal(result.success, false, result.text)
            });
        });
        milkman.setAddress( milkman.defaults.CHECK_SETT_ADDRESS_ERR2, function( result ) {
            test('test 1 CHECK_SETT_ADDRESS_ERR2', function() {
                equal(result.success, false, result.text)
            });
        });
        milkman.setAddress( milkman.defaults.CHECK_SETT_ADDRESS_ERR3, function( result ) {
            test('test 1 CHECK_SETT_ADDRESS_ERR3', function() {
                equal(result.success, false, result.text)
            });
        });

    });
}));