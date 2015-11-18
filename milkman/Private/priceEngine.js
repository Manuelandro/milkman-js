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
        return function priceEngine( intervals_of_interest, callback ) {
            var best_price, result;

            intervals_of_interest.forEach(function( value, index ){
                if ( index === 0 || best_price.weight * best_price.price > value.weight * value.price ){
                    best_price = value
                }

                if( index + 1 === intervals_of_interest.length ){

                  //  console.log('qui: '+JSON.stringify(best_price));
                    result = returnPrice( best_price );
                    callback( result );
                }
            });

            /**
             *  funzione per il calcolo del prezzo scontato
             *
             */
            function returnPrice( price ) {
                var final_price,
                    corr_discount = constants.discounts.filter(function (disc) {

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

                return final_price;
            }
        }
    });
