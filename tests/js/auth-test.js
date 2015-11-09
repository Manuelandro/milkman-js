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

    //verifico che se passo range senza [] lo inserisce la funzione
    milkman.setInit( milkman.defaults.SETTINGS_1, function( result ) {
        test('authenticate test SETTINGS', function() {
            equal(result.success, true, result.text)});
    });

    // verifico che salvi un range di tipo array con 1 elemento.
    milkman.setInit( milkman.defaults.SETTINGS_2, function( result_1 ) {
        test('authenticate test SETTINGS', function() {
            equal(result_1.success, true, result_1.text)});
    });

    // verifico che salvi un range di tipo array con più item.
    milkman.setInit( milkman.defaults.SETTINGS_3, function( result_2 ) {
        test('authenticate test SETTINGS', function() {
            equal(result_2.success, true, result_2.text)});
    });

    milkman.setInit( milkman.defaults.ERR1_SETTINGS, function( result_3 ) {
        test('authenticate test ERR1_SETTINGS', function() {
            equal(result_3.success, false, result_3.text)});
    });

    milkman.setInit( milkman.defaults.ERR2_SETTINGS, function( result_4 ) {
        test('authenticate test ERR2_SETTINGS', function() {
            equal(result_4.success, false, result_4.text)});
    });

    milkman.setInit( milkman.defaults.ERR3_SETTINGS, function( result_5 ) {
        test('authenticate test ERR3_SETTINGS', function() {
            equal(result_5.success, false, result_5.text)});
    });
}));