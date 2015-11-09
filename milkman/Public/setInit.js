define([ '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        'moment',
        '../../milkman/Private/makeDefaultRange',
        '../../milkman/Private/checkAddress'],
    function ( makeUrlServer, request, constants, moment, makeDefaultRange, checkAddress ) {
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
            var url = makeUrlServer('/authenticate'), normalizedAddress = [];

            // CHECK for required fields:
            // publishable_key
            // server merchant's URL
            // ( address, carts and consignee are optionals )
            if(
                data.publishableKey &&
                data.redirectUri
            ){

                //variables are saved in local storage
                window.localStorage.setItem(
                    constants.PUBLISHABLE_KEY, data.publishableKey
                );
                window.localStorage.setItem(
                    constants.REDIRECT_URI, data.redirectUri
                );

                //OPTIONAL address field
                //if( data.address ){
                    //verifico che l'address abbia o la stringa di testo o le coordinate lat-lng
                    checkAddress( data.address, function( normalizedAddress ){
                        request( url, 'POST', {
                            publishableKey: data.publishableKey,
                            address: normalizedAddress,
                            carts: data.carts,
                            consignee: data.consignee
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

                                //se ho tutti i dati richiesti in modo obbligatorio posso procedere con getQuote&findQuote
                                if( data.address ){
                                    constants.requiredFields['address'] = true; }
                                if( data.carts ){
                                    constants.requiredFields['cart'] = true; }

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
                        });
                    });
                //}

            } else {
                //if required values are NOT available
                callback({
                    success: false,
                    text: constants.ERROR.UNAUTHORIZED_401
                });
            }
        }
    });