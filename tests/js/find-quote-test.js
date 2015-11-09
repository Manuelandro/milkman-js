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
    milkman.setInit( milkman.defaults.SETTINGS_1, function( result, moment ) {

        var object = {
            range:[
                '2015-10-26/2015-11-01'//,
                //'2015-10-30',
                //'2015-11-02T14:00/2015-11-02T16:00'
            ],
            quoteNumber: 6,
            quotePerDate: 2,
            overlap: false,
            minDuration: 2,
            maxDuration: 4,
            weekdays: [ 1, 2, 3, 4, 5 ]//,
            //distribution: {
            //    order: 'price',
            //    intervals: 3,
            //    closeBound: true,
            //    quotation: [
            //        {quote: 1, maxPrice: 0},
            //        {quote: 2, maxPrice: 9.99},
            //        {quote: 1, maxPrice: 19.99}
            //    ]
            //}
            //hours: [ '09:30/12:00', '14:00/17:00' ]
        };

        milkman.findQuote(object, function( results ){
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
            });





            test('authenticate test SETTINGS', function() {
                equal(true, true, result.text)
            });

        });



}));