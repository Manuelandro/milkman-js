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

    milkman.setInit( milkman.defaults.SET_A5, function( ) {
        milkman.setAddress( milkman.defaults.SET_B2, function( ) {


            //var range = {};
            var r = {
                ranges : '2015-12-14T9:01/2015-12-14T09:55'
            };

            milkman.getQuote(r, function( result ){
                //   result.ranges.forEach(function( val ){
                    //console.log('getQuote: '+JSON.stringify(val));
                //   });
                //console.log('price: '+JSON.stringify(result.price));
                //milkman.confirm(result, function( res2 ){
                //    //   res2.ranges.forEach(function( val ){
                //        //console.log('//console: '+JSON.stringify(val));
                //    //  });
                //    //console.log('price: '+JSON.stringify(res2.price));
                //
                    test('SET_C1', function() {
                        equal(result.status, 'success', result.text)
                    });
                //});
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