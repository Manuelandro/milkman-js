define([ '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/commit',
        '../../milkman/Private/checkProposal'
    ],
    function ( makeUrlServer, request, constants, commit, checkProposal ) {
    'use strict';

        /**
         * Verify the publishable_key and get the session token
         *
         *  @PARAM: String
         *  @PARAM: Function
         *
         *  milkman.authenticate( publishable_key, foo )
         */

    return function confirm( deal_id, callback ) {
        /**
         * check proposal exists
         *
         *  @PARAM: Array
         *  @PARAM: String
         *  @PARAM: Function
         *
         *  @RETURN: success/error
         */
        console.log('CONTROLLO CHE LA PROPOSAL ESISTA. ');
        var isDeal = constants.deals.filter( function( deal ){

            if( deal.id === deal_id ){
                return true;
            }
        });

        if( isDeal.length ) {
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
                    price: isDeal[0].price,
                    rangeDate: isDeal[0].ranges },
                function( result ) {
                    console.log('succ: '+ result.success);


                    /**
                     * send session_id to merchant server
                     *
                     *  @RETURN: success/error
                     */

                    //result.success ?
                    //commit( function( result ){
                    //    console.log('COMMIT: '+result.success);
                    //    if ( result.success ) {
                    //        //cancel the session token on local storage
                    //        window.localStorage.removeItem( constants.SESSION_TOKEN );
                    //        callback({
                    //            success: true
                    //        });
                    //    } else {
                    //        callback({
                    //            success: false,
                    //            text: result.text
                    //        });
                    //    }
                    //})
                    //
                    //:
                    //
                    //callback({
                    //    success: false,
                    //    text: result.jqXHR
                    //});
                });

        } else {
            callback({
                success: false,
                text: constants.ERROR.BAD_REQUEST_400,
                message: 'Corresponding deal not found, check the identifier.'
            });
        }


    }
});