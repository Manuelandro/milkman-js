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

    milkman.setInit( milkman.defaults.SET_A1, function( result ) {
        test('TEST A1: p.key + uri + track. no cart', function() {
            equal(result.status, 'failure', result.text+': '+result.error_message)});
    });
    milkman.setInit( milkman.defaults.SET_A2, function( result ) {
        test('TEST A2: only p.key', function() {
            equal(result.status, 'failure', result.text+': '+result.error_message)});
    });
    milkman.setInit( milkman.defaults.SET_A3, function( result ) {
        test('TEST A3: only uri', function() {
            equal(result.status, 'failure', result.text+': '+result.error_message)});
    });
    milkman.setInit( milkman.defaults.SET_A4, function( result ) {
        test('TEST A4: only track', function() {
            equal(result.status, 'failure', result.text+': '+result.error_message)});
    });
    milkman.setInit( milkman.defaults.SET_A5, function( result ) {
        test('TEST A5: base + pickup id', function() {
            equal(result.status, 'success', result.text)});
    });
    milkman.setInit( milkman.defaults.SET_A6, function( result ) {
        test('TEST A6: base + pickup address + latlng', function() {
            equal(result.status, 'success', result.text)});
    });
    milkman.setInit( milkman.defaults.SET_A7, function( result ) {
        test('TEST A7: base + pickup address', function() {
            equal(result.status, 'success', result.text)});
    });
    milkman.setInit( milkman.defaults.SET_A8, function( result ) {
        test('TEST A8: base + pickup latlng', function() {
            equal(result.status, 'success', result.text)});
    });
    milkman.setInit( milkman.defaults.SET_A9, function( result ) {
        test('TEST A9: base + no pickup required', function() {
            equal(result.status, 'failure', result.text)});
    });
    milkman.setInit( milkman.defaults.SET_A10, function( result ) {
        test('TEST A10: base + multiple choice', function() {
            equal(result.status, 'success', result.text)});
    });
    milkman.setInit( milkman.defaults.SET_A11, function( result ) {
        test('TEST A11: base + multiple choice  + error', function() {
            equal(result.status, 'failure', result.text+': '+result.error_message)});
    });
    milkman.setInit( milkman.defaults.SET_A12, function( result ) {
        test('TEST A12: base + cart value', function() {
            equal(result.status, 'failure', result.text+': '+result.error_message)});
    });
    milkman.setInit( milkman.defaults.SET_A13, function( result ) {
        test('TEST A13: base + cart firstday', function() {
            equal(result.status, 'failure', result.text+': '+result.error_message)});
    });
    milkman.setInit( milkman.defaults.SET_A14, function( result ) {
        test('TEST A14: base + cart auxcost', function() {
            equal(result.status, 'failure', result.text+': '+result.error_message)});
    });
    milkman.setInit( milkman.defaults.SET_A15, function( result ) {
        test('TEST A15: base + cart weight', function() {
            equal(result.status, 'failure', result.text+': '+result.error_message)});
    });
    milkman.setInit( milkman.defaults.SET_A16, function( result ) {
        test('TEST A16: base + cart other', function() {
            equal(result.status, 'failure', result.text+': '+result.error_message)});
    });
}));