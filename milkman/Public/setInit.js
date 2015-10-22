define([ '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        'moment',
        '../../milkman/Private/makeDefaultRange'],
    function ( makeUrlServer, request, constants, moment, makeDefaultRange ) {
        'use strict';

        /**
         * Verify mandatory parameters are passed to the method and returns session token with quotes
         *
         *  @PARAM: [ Object, Object ]
         *  @PARAM: Function
         *
         *  milkman.authenticate( publishable_key, foo )
         */

        return function setInit( data, callback ) {
            var url = makeUrlServer('/authenticate');

            if(          // CHECK che l'utente abbia inserito:
                data.publishableKey &&      // la publishable_key
                data.redirectUri &&         // l'URL del server merchant
                data.address &&             // i dati legati all'indirizzo
                data.carts                  // i dati legati al carrello prodotti
            ){

                //variables are saved in local storage
                window.localStorage.setItem(
                    constants.PUBLISHABLE_KEY, data.publishableKey
                );
                window.localStorage.setItem(
                    constants.REDIRECT_URI, data.redirectUri
                );

                request( url, 'POST', {
                    publishableKey: data.publishableKey,
                    address: data.address,
                    carts: data.carts
                }, function( result ) {

                    if ( result.success )
                    {

                        //session id is saved in local storage
                        window.localStorage.setItem(
                            constants.SESSION_TOKEN, result.data.session._id
                        );
                        window.localStorage.setItem(
                            constants.MERCHANT, JSON.stringify(result.data.merchant)
                        );
                        window.localStorage.setItem(
                            constants.DEFAULT_RANGE, makeDefaultRange(
                                data.firstAvailableDay,
                                data.firstAvailableTime,
                                moment( data.firstAvailableDay ).add( result.data.merchant.defaultRangeDays, 'd' ).format('YYYY-MM-DD'),
                                result.data.merchant.bhInterval.split('/')[1]
                            )
                        );

                        callback({
                            success: true,
                            text: constants.SUCCESS.OK_200
                        }, moment);
                    }
                    else
                    {
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