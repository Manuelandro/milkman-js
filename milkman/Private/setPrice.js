define([
        '../../milkman/Private/priceEngine',
        '../../milkman/Utils/constants'],

    function( price_engine, constants ) {
        'use strict';

        /**
         *
         */
        return function setPrice( ranges, intervals_of_interest, callback ) {
            intervals_of_interest.length ?

                price_engine( intervals_of_interest, function( price ) {
                    callback({
                        status: 'success',
                        text: constants.STATUS.SUCCESS.OK_200,
                        ranges: ranges,
                        price: price
                    });
                }) :

                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE.NO_RESULTS_402
                });
        };
    }
);