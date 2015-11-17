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

    //verifico che se passo range senza [] lo inserisce la funzione
    milkman.setInit( milkman.defaults.SET_A5, function( ) {
        milkman.setAddress( milkman.defaults.SET_B2, function( ) {

            //milkman.findQuote(milkman.defaults.SET_D1, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    milkman.confirm(result.quotes[0], function( res2 ){
            //        console.log('confirm: '+JSON.stringify(res2));
            //        test('SET_D1', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});

            //milkman.findQuote(milkman.defaults.SET_D2, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    milkman.confirm(result.quotes[0], function( res2 ){
            //        console.log('confirm: '+JSON.stringify(res2));
            //        test('SET_D2', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});

            //milkman.findQuote(milkman.defaults.SET_D3, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    test('SET_D3', function() {
            //        equal(result.status, 'failure', result.text)
            //    });
            //
            //});

            //milkman.findQuote(milkman.defaults.SET_D4, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    milkman.confirm(result.quotes[0], function( res2 ){
            //        console.log('confirm: '+JSON.stringify(res2));
            //        test('SET_D4', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});

            //milkman.findQuote(milkman.defaults.SET_D5, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    milkman.confirm(result.quotes[0], function( res2 ){
            //        console.log('confirm: '+JSON.stringify(res2));
            //        test('SET_D5', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});

            //milkman.findQuote(milkman.defaults.SET_D6, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    milkman.confirm(result.quotes[0], function( res2 ){
            //        console.log('confirm: '+JSON.stringify(res2));
            //        test('SET_D6', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});

            //milkman.findQuote(milkman.defaults.SET_D7, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    test('SET_D7', function() {
            //        equal(result.status, 'failure', result.text)
            //    });
            //});

            milkman.findQuote(milkman.defaults.SET_D8, function( result ){
                console.log('findQuote: '+JSON.stringify(result));

                milkman.confirm(result.quotes[0], function( res2 ){
                    console.log('confirm: '+JSON.stringify(res2));
                    test('SET_D8', function() {
                        equal(res2.status, 'success', result.text)
                    });
                });
            });

            //milkman.findQuote(milkman.defaults.SET_D9, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    milkman.confirm(result.quotes[0], function( res2 ){
            //        console.log('confirm: '+JSON.stringify(res2));
            //        test('SET_D9', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});

            //milkman.findQuote(milkman.defaults.SET_D10, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    milkman.confirm(result.quotes[0], function( res2 ){
            //        console.log('confirm: '+JSON.stringify(res2));
            //        test('SET_D10', function() {
            //            equal(result.status, 'success', result.text)
            //        });
            //    });
            //});

            //milkman.findQuote(milkman.defaults.SET_D11, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    milkman.confirm(result.quotes[0], function( res2 ){
            //        console.log('confirm: '+JSON.stringify(res2));
            //        test('SET_D11', function() {
            //            equal(res2.status, 'success', result.text)
            //        });
            //    });
            //});

            //milkman.findQuote(milkman.defaults.SET_D12, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    milkman.confirm(result.quotes[0], function( res2 ){
            //        console.log('confirm: '+JSON.stringify(res2));
            //        test('SET_D12', function() {
            //            equal(res2.status, 'success', result.text)
            //        });
            //    });
            //});

            //milkman.findQuote(milkman.defaults.SET_D13, function( result ){
            //    console.log('findQuote: '+JSON.stringify(result));
            //
            //    milkman.confirm(result.quotes[0], function( res2 ){
            //        console.log('confirm: '+JSON.stringify(res2));
            //        test('SET_D13', function() {
            //            equal(res2.status, 'success', result.text)
            //        });
            //    });
            //});

        });
    });
}));

//milkman.findQuote(object, function( results ){
//var tmp_dist = [
//    {quote: 1, maxPrice: 0},
//    {quote: 2, maxPrice: 9.99},
//    {quote: 2, maxPrice: 19.99},
//    {quote: 1, maxPrice: 89.99}
//];
//results.quotes.forEach(function(res){
//    //console.log('results: '+JSON.stringify(res));
//
//    tmp_dist.forEach( function( dist, index ){
//        //ci sono ancora quote nel range ma il prezzo è stato superato
//        //prendo le quote e le assegno all'intervallo successivo
//        //IF
//        var cond1 = dist.quote > 0,
//            cond2 = dist.maxPrice < res.price;
//        //ELSE IF
//        var cond3 = dist.maxPrice >= res.price,
//            cond4 = ( index === 0 || tmp_dist[index - 1].maxPrice < res.price );
//        //ELSE IF
//        var cond5 = index + 1 === tmp_dist.length;
//            //cond6 = dist.quote > 0 && tmp_dist[index - 1].quote === 0,
//            //cond7 = index === 0 || tmp_dist[index - 1].maxPrice > res.price;
//
//        if( cond1 && cond2 ) {
//            console.log('prezzo superato.');
//            tmp_dist[index+1].quote = tmp_dist[index+1].quote + tmp_dist[index].quote;
//            tmp_dist[index].quote = 0;
//        }
//        //ci sono ancora quote ed il prezzo è coerente con l'intervallo
//        //riduco di 1 le quote e vado a buon fine
//
//        else if( cond1 && cond3 && cond4 ) {
//            tmp_dist[index].quote = tmp_dist[index].quote - 1;
//            console.log('ok: '+res.price);
//        }
//
//        //non ci sono più quote
//        //passo all'intervallo successivo
//
//
//
//    });
//  });


