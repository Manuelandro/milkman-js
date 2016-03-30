define([
    '../../milkman/Private/paramsValidator',
    '../../milkman/Utils/schema',
    '../../milkman/Private/makeUrlServer',
    '../../milkman/Private/request',
    '../../milkman/Utils/constants',
    'moment',
       // '../../milkman/Private/checkAddress'],
    '../../milkman/Private/checkCart'
    ], function ( validation, schema, makeUrlServer, request, constants, moment, checkCart ) {
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
        var url = makeUrlServer('/setInit');

        /**
         *  CHECK for required fields:
         *  publishable_key
         *  server merchant's URL
         *  trackingCode
         *  parcels
         */
        //function isNumber(n) {
        //    return !isNaN(parseFloat(n)) && isFinite(n);
        //}
       constants.parseKeys = {
           "applicationId": "JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
           "javascriptKey": "bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
       };

        validation( JSON.stringify(data), schema.setInitOrder, function(){
            validation( JSON.stringify(data.cart), schema.setInitCart, function(){
                //var parcelsError = [];
                //data.parcels.forEach(function(parcel, index){
                //    validation( JSON.stringify(parcel), schema.setInitParcel, function(){
                //        if(data.parcels.length === index+1){
                //           if(!parcelsError.length){
                //               //todo check for pickup address
                //
                //
                //
                //           } else {
                //               callback({status: 'failure', text: parcelsError.toString()});
                //           }
                //        }
                //    }, function( parcels_error ){
                //        parcelsError.push(parcels_error);
                //    });
                //});

                /** set to zero local variables*/
                constants.defaultRange = '';
                constants.requiredFields = {};
                constants.range = [];
                constants.data = {};
                constants.intervals = [];
                constants.discounts = [];
                constants.merchant_details = '';

                /** set to zero local storage*/
                window.localStorage.removeItem('addresses');
                window.localStorage.removeItem('default_range');
                window.localStorage.removeItem('hub');
                window.localStorage.removeItem('merchant');
                window.localStorage.removeItem('proposal_id');
                window.localStorage.removeItem('publishable_key');
                window.localStorage.removeItem('redirect_uri');
                window.localStorage.removeItem('session_token');

                /** variables are saved in local storage */
                window.localStorage.setItem(
                    constants.PUBLISHABLE_KEY, data.publishableKey
                );
                window.localStorage.setItem(
                    constants.REDIRECT_URI, data.redirectUri
                );
                /**
                 *  verifico che tutti i parcels abbiano i campi obbligatori
                 *
                 *  @returns solo i parcels che rispettano i vincoli richiesti
                 */
                checkCart( data.cart.parcels, function( resaults ){
                    /** verifico che tutti i parcels abbiano superato il check */
                    if( resaults.length === data.cart.parcels.length ) {
                        request( url, 'POST', {
                            publishableKey: data.publishableKey,
                            redirectUri: data.redirectUri,
                            trackingCode: data.trackingCode,
                            city: data.city,
                            postalCode: data.postalCode,
                            cart: JSON.stringify(data.cart)
                        }, function( response ) {

                            //console.log('response: '+JSON.stringify(response));
                            if ( response.success )
                            {
                                /** ESEMPO DI RISPOSTA POSITIVA
                                 *  {
                            * "merchant": {
                            *    "atomicIntervalDimension":10,
                            *    "email":"luca.gugole@milkman.it",
                            *    "maxDuration":12,
                            *    "minDuration":3,
                            *    "name":"merchant",
                            *    "quoteNumber":1,
                            *    "quotesPerDay":1
                            * },
                            * "session": {
                            *    "_id":"3IBBfSYcQE",
                            *    "isActive":true,
                            *    "proposalId":"7LFEkfEIak"
                            * },
                            * "success":true
                            * }*/

                                /** session id is saved in local storage */
                                window.localStorage.setItem(
                                    constants.SESSION_TOKEN, response.session.sessionId
                                );
                                window.localStorage.setItem(
                                    constants.PROPOSAL_ID, response.session.proposalId
                                );
                                window.localStorage.setItem(
                                    constants.MERCHANT, JSON.stringify(response.merchant)
                                );
                                callback({
                                    status: 'success',
                                    text: constants.STATUS.SUCCESS._200
                                });
                            }
                            else
                            {
                                callback({
                                    status: 'failure',
                                    text: response.error
                                });
                            }
                        });
                    } else {
                        callback({
                            status: 'failure',
                            text: constants.STATUS.FAILURE._401,
                            error_message: constants.STATUS.ERROR_MESSAGE._409
                        });
                    }


                });

            }, function( cart_error ){
                callback({status: 'failure', text: cart_error.messageError});
            });
        }, function( order_error ){
            callback({status: 'failure', text: order_error.messageError});
        });


        //if(
        //    data.redirectUri &&
        //    data.publishableKey &&
        //    data.city || data.postalCode &&
        //    data.trackingCode &&
        //    isNumber(data.cart.subsidyCost) &&
        //    isNumber(data.cart.standardCost) &&
        //    data.cart.parcels
        //){

            ///** set to zero local variables*/
            //constants.defaultRange = '';
            //constants.requiredFields = {};
            //constants.range = [];
            //constants.data = {};
            //constants.intervals = [];
            //constants.discounts = [];
            //constants.merchant_details = '';
            //
            ///** set to zero local storage*/
            //window.localStorage.removeItem('addresses');
            //window.localStorage.removeItem('default_range');
            //window.localStorage.removeItem('hub');
            //window.localStorage.removeItem('merchant');
            //window.localStorage.removeItem('proposal_id');
            //window.localStorage.removeItem('publishable_key');
            //window.localStorage.removeItem('redirect_uri');
            //window.localStorage.removeItem('session_token');
            //
            ///** variables are saved in local storage */
            //window.localStorage.setItem(
            //    constants.PUBLISHABLE_KEY, data.publishableKey
            //);
            //window.localStorage.setItem(
            //    constants.REDIRECT_URI, data.redirectUri
            //);


        //} else {
        //    /** if required values are NOT available */
        //    callback({
        //        status: 'failure',
        //        text: constants.STATUS.FAILURE._401,
        //        error_message: constants.STATUS.ERROR_MESSAGE._410
        //    });
        //}
    }
});