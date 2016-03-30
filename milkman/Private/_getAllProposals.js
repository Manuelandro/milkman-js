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

                    /** calcolo maxDuration possibilità a partire da idi corrente */
                    for ( var i = 0; i < maxDuration; i++ ){

                        if( index + i + 1 <= group.length && /** se non sono arrivata alla fine dell'array */
                            minDuration <= i +1 ){  /** se rispetto il vincolo della dimensione minima del blocco */

                        var tmp_day = group[index + i].interval.split('T')[0],
                            final_bound = group[index + i].interval.split('T')[2];

                            /** se la data del primo intervallo e dell'ultimo coincidono procedo */
                            if( moment(tmp_day).diff(moment(day)) === 0 ){

                                /** calcolo prezzo e intervallo di sconto */
                                var tmp_price = setPrice(index, index + i, group),
                                    tmp_discount = setDiscount(data.disc, i +1);

                                //console.log(init_bound+'/'+final_bound +' price: '+tmp_price * tmp_discount+' disc: '+tmp_discount);

                                tmp_best_choices.push({
                                    day: day,
                                    i_bound: init_bound,
                                    f_bound: final_bound,
                                    range: init_bound +'/'+final_bound,
                                    //i_price: tmp_price,
                                    f_price: tmp_price * tmp_discount//,
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

            return best_choices;
        };

        /**
         * faccio il confronto fra tutti i prezzi e verifico quale intervallo,
         * fra quelli del sotto gruppo, è il più conveniente
         *
         * @param start_index
         * @param end_index
         * @param intervals
         * @returns {number}
         */
        function setPrice( start_index, end_index, intervals ){
            var best_price = intervals[start_index];

            for( var i = start_index; i <= end_index; i++ ){
                if ( best_price.weight * best_price.price > intervals[i].weight * intervals[i].price ){
                    best_price = intervals[i]
                }
            }

            return best_price.price * best_price.weight
        }

        /**
         * trovo il range di sconto corretto in base alla dimensione del sottogruppo,
         * ritorno il valore associato
         *
         * @param discounts
         * @param intervalNumber
         * @returns {*}
         */
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