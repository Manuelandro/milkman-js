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

            var tmp_deals = constants.deals.filter( function( deal ){
                if ( String( deal.id ) !== String( deal_id ) ){
                    return true;
                }
            });

            constants.deals = tmp_deals;

            callback({
                success: true,
                text: constants.SUCCESS.OK_200
            });
        }

    }
);
