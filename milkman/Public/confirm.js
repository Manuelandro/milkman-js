define([ '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/commit',
        '../../milkman/Public/getQuote',
        '../../milkman/Private/quoteHistory'
    ],
    function ( makeUrlServer, request, constants, commit, getQuote, quoteHistory ) {
    'use strict';

        /**
         * Verify the publishable_key and get the session token
         *
         *  @PARAM: String
         *  @PARAM: Function
         *
         *  milkman.authenticate( publishable_key, foo )
         */

    return function confirm( ranges, callback ) {

        //HISTORY TRACKING on server
        quoteHistory('confirm', ranges);

        //ricalcolo il prezzo per l'intervallo specifico
        getQuote( ranges, function( result ){

            if( result.success ){
                /**
                 * PRICE CONFIRM: send proposal to server for price confirm
                 *
                 *  @PARAM: Array
                 *  @PARAM: String
                 *  @PARAM: Function
                 *
                 *  @RETURN: success/error
                 */
                var url = makeUrlServer('/priceConfirm'),
                    publishable_key = window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                    session_id = window.localStorage.getItem( constants.SESSION_TOKEN );

                request( url, 'POST', {
                        sessionId: session_id,
                        publishableKey: publishable_key,
                        price: result.price,
                        intervals: result.ranges },
                    function( result ) {
                        console.log('succ: '+ result.success);


                        /**
                         * send session_id to merchant server
                         *
                         *  @RETURN: success/error
                         */

                        result.success ?
                            commit( function( result ){
                                if ( result.success ) {
                                    //cancel the session token on local storage
                                    window.localStorage.removeItem( constants.SESSION_TOKEN );
                                    callback({
                                        success: true
                                    });
                                } else {
                                    callback({
                                        success: false,
                                        text: result.text
                                    });
                                }
                            })

                            :

                            callback({
                                success: false,
                                text: result.jqXHR
                            });
                    });
            } else {
                //genero errore, il range passato non � corretto
                callback( result );
            }

        });
    }
});