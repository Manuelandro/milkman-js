define([ './makeUrlServer',
        './request',
        "./recoverData",
        '../../milkman/Utils/constants' ],
    function ( makeUrlServer, request, recover, constants ) {
        'use strict';


        /**
         * *** PRIVATE FUNCTION ***
         * it finds the cheapest solution and calculate the discount over the time windows
         *
         *  @PARAM: String
         *  @PARAM: Function
         *
         */
        return function priceEngine( ranges, intervals_of_interest, callback ) {
            var best_price;

            intervals_of_interest.forEach(function( value, index ){
                if ( index === 0 || best_price.weight > value.weight ){
                    best_price = value
                }

                if( index + 1 === intervals_of_interest.length ){

                    //verifico che i dati in memoria temporanea siano consistenti,
                    // in caso contrario recupero i dati dal server
                    if( constants.data ){
                    var newDeal = returnPrice( best_price, constants.data);
                        callback( newDeal );

                    } else {
                        recover( function( result ){
                            var newDeal = returnPrice( best_price, result );
                            callback( newDeal );
                        });
                    }
                }
            });

            /**
             *  funzione per il calcolo del prezzo scontato
             *
             */
            function returnPrice( price, data ) {
                var final_price,
                    corr_discount = data.discounts.filter(function (disc) {

                        var bound_left = disc.range.split('/')[0] <= intervals_of_interest.length,
                            bound_right = disc.range.split('/')[1] === '' ? true : intervals_of_interest.length < disc.range.split('/')[1];

                        if (bound_left && bound_right) {
                            return disc;
                        }
                    });

                if (corr_discount.length) {
                    final_price = Number(corr_discount[0].discount) *
                        Number(price.price * price.weight);
                } else {
                    final_price = Number(price.price * price.weight);
                }

                var deal_id = constants.deals.length;

                constants.deals.push({
                    id: deal_id,
                    ranges: ranges,
                    price: final_price,
                    intervals: intervals_of_interest
                });

                return {price: final_price, id: deal_id};
            }
        }
    });
