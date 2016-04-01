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

    var data = {};

    data['merchant'] = '003';
    data['externalTrackingCode'] = '100164000';

    milkman.getETA(data, function( getQuoteResult ){

        test('SET_A1', function() {
            equal(getQuoteResult.status, 'success', JSON.stringify(getQuoteResult));
        });
    });

    var data1 = {};

    data1['merchant'] = '0cfdafsdfdsf03';
    data1['externalTrackingCode'] = '100164000';

    milkman.getETA(data1, function( getQuoteResult ){

        test('data1', function() {
            equal(getQuoteResult.status, 'failure', JSON.stringify(getQuoteResult));
        });
    });

    var data2 = {};

    data2['merchant'] = '';
    data2['externalTrackingCode'] = '100164000';

    milkman.getETA(data2, function( getQuoteResult ){

        test('data2', function() {
            equal(getQuoteResult.status, 'failure', JSON.stringify(getQuoteResult));
        });
    });

    var data3 = {};

    data3['merchant'] = '003';
    data3['externalTrackingCode'] = '';

    milkman.getETA(data3, function( getQuoteResult ){

        test('data3', function() {
            equal(getQuoteResult.status, 'failure', JSON.stringify(getQuoteResult));
        });
    });

    var data4 = {};

    data4['merchant'] = '003';
    data4['externalTrackingCode'] = 'sdfssfrwegfrears';

    milkman.getETA(data4, function( getQuoteResult ){

        test('data4', function() {
            equal(getQuoteResult.status, 'failure', JSON.stringify(getQuoteResult));
        });
    });
}));