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

        var object = { range:'2015-10-29'
            //range: ['2015-10-20T09:00/2015-10-20T18:30'], '2015-10-29T11:30', '2015-10-20T09:00/2015-10-20T09:30']
        };

        milkman.findQuote(object, function( res ){

            //console.log('price: '+ JSON.stringify(res));

            var quoteNumber = 3, //numero totale di eventi che voglio generare
                maxDuration = 4, //durata massima dell'evento
                quotePerDate = 2, //numero massimo di eventi con la stessa data
                overlap = false;  //gli eventi non si possono accavallare

            var tmp_best_choices = [],
                best_int = null,
                best_p = null,
                best_disc = null,
                best_day = null;

            res.idi.forEach(function ( idi, index ) {

                var day = idi.interval.split('T')[0];

                //calcolo maxDuration possibilità a partire da idi corrente
                for ( var i = 0; i < maxDuration; i++ ){

                    if( index + i +1 <= res.idi.length ){
                        var tmp_discount = 1,
                            tmp_date = res.idi[index + i].interval.split('T')[0],
                            tmp_p = res.idi[index + i].price * res.idi[index + i].weight,
                            tmp_int = idi.interval.split('/')[0].split('T')[1]+'/'+res.idi[index + i].interval.split('T')[2];

                        //se la data del primo intervallo e dell'ultimo coincidono procedo
                        if( moment(tmp_date).diff(moment(day)) === 0 ){

                            //trovo il range di sconto dato il numero di intervalli
                            res.disc.forEach( function( disc ){
                                var bound_left = disc.range.split('/')[0] <= i,
                                    bound_right = disc.range.split('/')[1] === '' ? true : i < disc.range.split('/')[1];

                                if (bound_left && bound_right) {
                                    tmp_discount = disc.discount;
                                }
                            });

                            //se sono al primo ciclo e se il nuovo prezzo è migliore del precedente lo salvo
                            if( best_p === null || best_p * best_disc > tmp_p * tmp_discount){
                                best_day = day;
                                best_disc = tmp_discount;
                                best_p = tmp_p;
                                best_int = idi.interval.split('/')[0].split('T')[1]+'/'+res.idi[index + i].interval.split('T')[2];
                            }

                            console.log('tmp: '+tmp_int+' -- '+tmp_p*tmp_discount);
                        }

                    }


                }



                //if ( tmp_best_choices.length < quoteNumber ) {
                    //butto dentro il nuovo best choice
                    tmp_best_choices.push({
                        price: best_p,
                        discount: best_disc,
                        interval: best_day +'T'+ best_int.split('/')[0]+'/'+best_day +'T'+ best_int.split('/')[1]
                    });

                    console.log('------------best: '+JSON.stringify(tmp_best_choices[0]));
                //} else {
                    //verifico che sia più conveniente del peggiore di quelli aggiunti
                //}

            });




            test('authenticate test SETTINGS', function() {
                equal(true, true, result.text)
            });

        });
    });

}));