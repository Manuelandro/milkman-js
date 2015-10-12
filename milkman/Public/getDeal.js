define(['moment',
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants' ],
    function ( moment, makeUrlServer, request, constants ) {
        'use strict';

        /**
         *  Get datas about a deal. If none deal correspond to the given id function return error.
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function getDeal( deal_id, callback ) {

            var deal_of_interest = constants.deals.filter( function( deal ){
                if ( String( deal.id ) === String( deal_id ) ){
                    return true;
                }
            });

            if( deal_of_interest.length ){
                callback({
                    success: true,
                    text: constants.SUCCESS.OK_200,
                    id: deal_of_interest.id,
                    ranges: deal_of_interest.ranges,
                    price: deal_of_interest.price
                });
            } else {
                callback({
                    success: false,
                    text: constants.ERROR.NO_RESULTS_402
                });
            }
        }

    }
);
