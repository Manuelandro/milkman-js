define([
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Utils/constants',
        '../../milkman/Private/request',
        '../../milkman/Private/checkInterval'],

    function( makeUrlServer, constants, request, check_interval ) {
        'use strict';

        /**
         *  se ci sono intervalli mancanti faccio una quotation al sever
         *  e filtro tutti gli intervalli per trovare quelli di interesse
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

                    if( result.success ){
                        /** save the new discount */
                        constants.discounts = result.data.session.discounts;
                        /** save the new intervals */

                        //console.log(JSON.stringify( constants.intervals ));

                        result.data.session.intervals.forEach(function( new_interval, index ){
                            //console.log(index+': '+JSON.stringify( new_interval.interval ));
                            constants.intervals.push( new_interval );
                        });

                        //console.log(JSON.stringify( constants.intervals ));
                        /** ritorna gli intervalli di interesse */
                        check_interval( ranges, constants.intervals, function( intervals_of_interest ){
                            callback({success: true, ioi: intervals_of_interest });
                        });
                    } else {
                        //console.log('error: '+JSON.parse(result.jqXHR.responseText).error.type);
                        callback({success: false, text: JSON.parse(result.jqXHR.responseText).error.type });
                    }
                });
            } else {
                /** ritorna gli intervalli di interesse */
                check_interval( ranges, constants.intervals, function( intervals_of_interest ){
                    callback({success: true, ioi: intervals_of_interest });
                });
            }
        };
    }
);
