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

    milkman.setInit( milkman.defaults.SETTINGS_1, function( result ) {
        test('SUCCESS TEST: con publishableKey e redirectUri creo sessione correttamente', function() {
            equal(result.success, true, result.text)});
    });
    milkman.setInit( milkman.defaults.ERR1_SETTINGS, function( result ) {
        test('ERROR TEST: senza publishableKey non posso procedere', function() {
            equal(result.success, false, result.text)});
    });
    milkman.setInit( milkman.defaults.ERR2_SETTINGS, function( result ) {
        test('ERROR TEST: senza redirectUri non posso procedere', function() {
            equal(result.success, false, result.text)});
    });
    milkman.setInit( milkman.defaults.SETTINGS_2, function( result ) {
        test('SUCCESS TEST: Address non include lat e lng quindi se li calcola e procede senza problemi', function() {
            equal(result.success, true, result.text)});
    });
    milkman.setInit( milkman.defaults.SETTINGS_3, function( result ) {
        test('SUCCESS TEST: Address include lat e lng e address quindi procedo senza problemi', function() {
            equal(result.success, true, result.text)});
    });
    milkman.setInit( milkman.defaults.SETTINGS_4, function( result ) {
        test('SUCCESS TEST: mando a server dati relativi a cart', function() {
            equal(result.success, true, result.text)});
    });
}));