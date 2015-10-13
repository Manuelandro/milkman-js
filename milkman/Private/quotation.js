define([
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Utils/constants',
        '../../milkman/Private/request',
        '../../milkman/Private/checkInterval'],

    function( makeUrlServer, constants, request, check_interval ) {
        'use strict';

        /**
         *
         *  @PARAM:
         *  @PARAM:
         *
         */

        return function quotation( ranges, intervals, callback ) {
            var url = makeUrlServer( '/quotation' );

            if( intervals.length ) {
                request( url, 'POST', {
                    intervals: intervals,
                    sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                    publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY)
                }, function( result ) {
                    //save the new discount
                    constants.discounts = result.data.session.discounts;
                    //save the new intervals
                    result.data.session.intervals.forEach(function( new_interval ){
                        constants.intervals.push( new_interval );
                    });

                    check_interval( ranges, constants.intervals, function( intervals_of_interest ){
                        callback( intervals_of_interest );
                    });
                });
            } else {


                check_interval( ranges, constants.intervals, function( intervals_of_interest ){
                    callback( intervals_of_interest );
                });
            }
        };
    }
);