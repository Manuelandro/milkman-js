define([ 'moment' ],

    function( moment ) {
        'use strict';

        /**
         *  dati tutti gli intervalli contenuti nel range fornito torna un'array ordinato per
         *  per costo ascendente con tutte le possibilità
         *
         *  @PARAM: Array
         *  @PARAM: number
         */
        return function getAllProposals( data, maxDuration, minDuration ){
            var best_choices = [];

            data.idi.forEach( function( group ){
                group.forEach(function ( idi, index ) {
                    var tmp_best_choices = [],
                        day = idi.interval.split('T')[0],
                        init_bound = idi.interval.split('/')[0].split('T')[1];

                    //console.log('init_bound: '+init_bound);
                    /** calcolo maxDuration possibilità a partire da idi corrente */
                    for ( var i = 0; i < maxDuration; i++ ){

                        //console.log('group: '+group.length);
                        //console.log('index: '+index + i + 1);
                        //console.log('minDuration: '+minDuration);
                        //console.log('i: '+i +1);

                        if( index + i +1 <= group.length && /** se non sono arrivata alla fine dell'array */
                            minDuration <= i +1 ){  /** se rispetto il vincolo della dimensione minima del blocco */

                        //console.log('ok');

                            var tmp_day = group[index + i].interval.split('T')[0],
                                tmp_p = group[index + i].price * group[index + i].weight,
                                final_bound = group[index + i].interval.split('T')[2];

                            console.log(init_bound+'/'+final_bound);

                            /** se la data del primo intervallo e dell'ultimo coincidono procedo */
                            if( moment(tmp_day).diff(moment(day)) === 0 ){

                                /** calcolo l'intervallo di sconto */
                                var tmp_discount = setDiscount(data.disc, i);

                                tmp_best_choices.push({
                                    day: day,
                                    i_bound: init_bound,
                                    f_bound: final_bound,
                                    range: init_bound +'/'+final_bound,
                                    //i_price: tmp_p,
                                    f_price: tmp_p * tmp_discount//,
                                    //discount: tmp_discount
                                });
                            }
                        }
                    }

                    /** tengo tutti i ranges */
                    tmp_best_choices.forEach(function( range ){
                        best_choices.push(range);
                    });
                });
            });

            /** ordino i ranges in base al prezzo finale */
            best_choices.sort(function(a, b) {
                return parseFloat(a.f_price) - parseFloat(b.f_price);
            });

            console.log('best_choices: '+best_choices);
            //return best_choices;

            //data.idi.forEach(function ( idi, index ) {
            //    var tmp_best_choices = [],
            //        day = idi.interval.split('T')[0],
            //        init_bound = idi.interval.split('/')[0].split('T')[1];
            //
            //    //console.log('init_bound: '+init_bound);
            //    /** calcolo maxDuration possibilità a partire da idi corrente */
            //    for ( var i = 0; i < maxDuration; i++ ){
            //
            //        if( index + i +1 <= data.idi.length && /** se non sono arrivata alla fine dell'array */
            //            minDuration <= i +1 ){  /** se rispetto il vincolo della dimensione minima del blocco */
            //
            //        //console.log('OK!! ');
            //
            //            var tmp_day = data.idi[index + i].interval.split('T')[0],
            //                tmp_p = data.idi[index + i].price * data.idi[index + i].weight,
            //                final_bound = data.idi[index + i].interval.split('T')[2];
            //
            //            //console.log(init_bound+'/'+final_bound);
            //
            //            /** se la data del primo intervallo e dell'ultimo coincidono procedo */
            //            if( moment(tmp_day).diff(moment(day)) === 0 ){
            //
            //                /** calcolo l'intervallo di sconto */
            //                var tmp_discount = setDiscount(data.disc, i);
            //
            //                tmp_best_choices.push({
            //                    day: day,
            //                    i_bound: init_bound,
            //                    f_bound: final_bound,
            //                    range: init_bound +'/'+final_bound,
            //                    //i_price: tmp_p,
            //                    f_price: tmp_p * tmp_discount//,
            //                    //discount: tmp_discount
            //                });
            //            }
            //        }
            //    }
            //
            //    /** tengo tutti i ranges */
            //    tmp_best_choices.forEach(function( range ){
            //        best_choices.push(range);
            //    });
            //});
            //
            ///** ordino i ranges in base al prezzo finale */
            //best_choices.sort(function(a, b) {
            //    return parseFloat(a.f_price) - parseFloat(b.f_price);
            //});
            //
            //return best_choices;
        };

        function setDiscount( discounts, intervalNumber ){
            var tmp_discount = null;

            discounts.forEach( function( disc ){
                var bound_left = disc.range.split('/')[0] <= intervalNumber,
                    bound_right = disc.range.split('/')[1] === '' ? true : intervalNumber < disc.range.split('/')[1];

                if (bound_left && bound_right) {
                    tmp_discount = disc.discount;
                }
            });

            return tmp_discount === null ? 1 : tmp_discount;
        }
    }
);