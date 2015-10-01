define([ '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants' ],
    function ( makeUrlServer, request, constants ) {
        'use strict';

        /**
         * Verify mandatory parameters are passed to the method and returns session token with quotes
         *
         *  @PARAM: [ Object, Object ]
         *  @PARAM: Function
         *
         *  milkman.authenticate( publishable_key, foo )
         */

        return function authenticate( data, callback ) {
            var url = makeUrlServer('/authenticate'), range = [];

            if(                             // CHECK che l'utente abbia inserito:
                data.rangeDate &&           // l'Intervallo di interesse per le quotation
                data.publishableKey &&      // la publishable_key
                data.redirectUri &&         // l'URL del server merchant
                data.address &&             // i dati legati all'indirizzo
                data.carts                  // i dati legati al carrello prodotti
            ){

                //converto se necessario rangeData in array
                if( !Array.isArray(data.rangeDate) ){
                    range[0] = data.rangeDate;
                } else {
                    range = data.rangeDate;
                }

                //variables are saved in local storage
                window.localStorage.setItem(
                    constants.PUBLISHABLE_KEY, data.publishableKey
                );
                window.localStorage.setItem(
                    constants.INTERVAL_OF_INTEREST, JSON.stringify( range )
                );
                window.localStorage.setItem(
                    constants.REDIRECT_URI, data.redirectUri
                );

                request( url, 'POST', {
                    rangeDate: range,
                    publishableKey: data.publishableKey,
                    address: data.address,
                    carts: data.carts
                }, function( result ) {

                    if ( result.success )
                    {
                        //session id is saved in local storage
                        window.localStorage.setItem(
                            constants.SESSION_TOKEN, result.data.sessionId
                        );
                        constants.data.intervals = result.data.intervals;
                        constants.data.discounts = result.data.discounts;

                        callback({
                            success: true,
                            text: constants.SUCCESS.OK_200,
                            data: result.data
                        });
                    }
                    else
                    {
                        //window.localStorage.removeItem( constants.SESSION_TOKEN );

                        callback({
                            success: false,
                            text: result.jqXHR
                        });
                    }
                })

            } else {
                callback({
                    success: false,
                    text: constants.ERROR.UNAUTHORIZED_401
                });
            }
        }
    });