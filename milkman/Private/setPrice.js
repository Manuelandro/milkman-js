define([
        '../../milkman/Private/priceEngine',
        '../../milkman/Utils/constants'],

    function( price_engine, constants ) {
        'use strict';

        /**
         *
         *  @PARAM:
         *  @PARAM:
         *
         */

        return function setPrice( ranges, intervals_of_interest, callback ) {
            intervals_of_interest.length ?

                price_engine( intervals_of_interest, function( price ) {
                    callback({
                        success: true,
                        text: constants.SUCCESS.OK_200,
                        ranges: ranges,
                        price: price
                    });
                }) :

                callback({
                    success: false,
                    text: constants.ERROR.NO_RESULTS_402
                });
        };
    }
);