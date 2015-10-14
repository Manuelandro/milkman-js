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

                        //todo: TOGLI QUESTO INSERIMENTO
                        //constants.intervals = [
                        //    { interval: '2015-10-20T09:00:00Z/2015-10-20T09:30:00Z', price: '1,99', weight: '0,25', currency: 'euro' },
                        //    { interval: '2015-10-20T19:00:00Z/2015-10-20T19:30:00Z', price: '1,99', weight: '0,25', currency: 'euro' },
                        //    { interval: '2015-10-20T08:00:00Z/2015-10-20T08:30:00Z', price: '1,99', weight: '0,25', currency: 'euro' },
                        //    { interval: '2015-10-22T08:30:00Z/2015-10-22T09:00:00Z', price: '1,99', weight: '0,85', currency: 'euro' },
                        //    { interval: '2015-10-22T19:30:00Z/2015-10-22T20:00:00Z', price: '1,99', weight: '0,85', currency: 'euro' }
                        //];
                        //window.localStorage.setItem(
                        //    constants.INTERVAL_OF_INTEREST, [
                        //        { interval: '2015-10-20T09:00:00Z/2015-10-22T09:30:00Z', price: '1,99', weight: '0,25', currency: 'euro' },
                        //        { interval: '2015-10-22T09:30:00Z/2015-10-22T10:00:00Z', price: '1,99', weight: '0,85', currency: 'euro' },
                        //    ]
                        //);


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