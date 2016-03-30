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
                        text: constants.STATUS.SUCCESS._200,
                        ranges: ranges,
                        price: Number(price).toFixed(2)
                    });
                }) :

                callback({
                    status: 'success',
                    text: constants.STATUS.SUCCESS._201
                });
        };
    }
);