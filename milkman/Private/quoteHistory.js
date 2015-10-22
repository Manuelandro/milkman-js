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

        return function quoteHistory( type, opt ) {
            var url = makeUrlServer('/quoteHistory');

            request( url, 'POST', {
                sessionId: window.localStorage.getItem( constants.SESSION_TOKEN ),
                publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                actionType: type,
                options: opt
            }, function( result ) {

                if (result.success)
                {
                    //segnarmi da qualche parte che è andata a buon fine?
                }
                else
                {
                    //tenere un LOG delle chiamate non andate a buon fine? o ignorare la cosa?
                }
            });

        }
    });