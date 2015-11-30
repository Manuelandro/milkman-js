define([ '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/commit',
        '../../milkman/Public/getQuote',
        '../../milkman/Private/quoteHistory',
        '../../milkman/Private/checkRequiredFields'
    ],
    function ( makeUrlServer, request, constants, commit, getQuote, quoteHistory, checkRequiredFields ) {
    'use strict';

        /**
         * Verify the publishable_key and get the session token
         *
         *  @PARAM: String
         *  @PARAM: Function
         *
         *  milkman.authenticate( publishable_key, foo )
         */

    return function confirm( data, callback ) {
        var isInitialized = checkRequiredFields('init');

        //console.log(JSON.stringify(data));
        //console.log(data.price);
        //console.log(data.price === undefined);

        if( isInitialized && data.price !== undefined && data.price !== null && data.ranges ){
        //HISTORY TRACKING on server
        quoteHistory('confirm', data);

        //ricalcolo il prezzo per l'intervallo specifico
        getQuote( data, function( result ){

            if( result.status === 'success' ){
                if( Math.round( Number(result.price) * 100) === Math.round( Number(data.price) * 100) ){
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

                            /**
                             * send session_id to merchant server
                             *
                             *  @RETURN: success/error
                             */

                            result.success ?
                                commit( function( result ){
                                    if ( result.success ) {
                                        //cancel the session token on local storage
                                        window.localStorage.removeItem(constants.SESSION_TOKEN);
                                        window.localStorage.removeItem(constants.PUBLISHABLE_KEY);
                                        window.localStorage.removeItem(constants.REDIRECT_URI);
                                        window.localStorage.removeItem(constants.PROPOSAL_ID);

                                        window.localStorage.removeItem(constants.DEFAULT_RANGE);

                                        window.localStorage.removeItem(constants.ADDRESSES);
                                        window.localStorage.removeItem(constants.MERCHANT);
                                        window.localStorage.removeItem(constants.HUB);

                                        callback({
                                            status: 'success'
                                        });
                                    } else {
                                        callback({
                                            status: 'failure',
                                            text: result.text
                                        });
                                    }
                                })

                                :

                                callback({
                                    status: 'failure',
                                    text: result.jqXHR
                                });
                        });
                } else {
                    /** il prezzo inviato dall'utente e quello calcolato non coincidono */
                    callback({
                        status: 'failure',
                        text: constants.STATUS.FAILURE._400,
                        errorMessage: constants.STATUS.ERROR_MESSAGE._403
                    });
                }

            } else {
                //genero errore, il range passato non � corretto
                callback( result );
            }
        });

        } else {  //isInitialized === false

            if( isInitialized ){
                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE._400,
                    errorMessage: constants.STATUS.ERROR_MESSAGE._413
                });
            } else {
                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE._400,
                    errorMessage: constants.STATUS.ERROR_MESSAGE._414
                });
            }

        }
    }
});