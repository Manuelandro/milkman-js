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

        return function authenticate( callback ) {
            var url = makeUrlServer('/recoverData');

            var publishableKey = window.localStorage.getItem( constants.PUBLISHABLE_KEY );
            var sessionId = window.localStorage.getItem( constants.SESSION_TOKEN );

            if(                   // CHECK che in local storage siano presenti:
            publishableKey &&     // public key
            sessionId             // session id
            ){

                request( url, 'GET', {
                    sessionId: sessionId,
                    publishableKey: publishableKey
                }, function( result ) {

                    if (result.success)
                    {
                        //quotes saved in temp memory
                        constants.quotes = result.data.quote;

                        callback({
                            status: 'success',
                            text: constants.STATUS.SUCCESS.OK_200,
                            quotes: result.data.quote
                        });
                    }
                    else
                    {
                        callback({
                            status: 'failure',
                            text: result.jqXHR
                        });
                    }
                });

            } else {
                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE.UNAUTHORIZED_401
                });
            }
        }
    });