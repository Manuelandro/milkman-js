/**
 * *** PRIVATE FUNCTION ***
 * Commit the session_id to the merchant uri
 *
 *  @PARAM: String
 *  @PARAM: Function
 *
 */

define([ '../milkman/Private/makeUrlServer',
        '../milkman/Private/request',
        '../milkman/Utils/constants' ],
    function ( makeUrlServer, request, constants ) {
        'use strict';

        return function commit( callback ) {

            var session_id = window.localStorage.getItem( constants.SESSION_TOKEN ),
                merchant_uri = window.localStorage.getItem( constants.REDIRECT_URI );

            console.log(' SESSION_TOKEN. '+constants.SESSION_TOKEN);

            console.log(session_id + ' . '+merchant_uri);
            //check che l'utente abbia inserito l'URL del server merchant
            session_id && merchant_uri ?

                request( merchant_uri+'/commit', 'POST', { 'session_id': session_id }, function( result ) {

                    result.success ?
                        callback({ success: true }) :
                        callback({ success: false, text: result.jqXHR });

                }) :

                callback({
                    success: false,
                    text: constants.STATUS.FAILURE.BAD_REQUEST_400
                });
        }

    });
