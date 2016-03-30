define([
    '../../milkman/Private/paramsValidator',
    '../../milkman/Utils/schema',
    '../../milkman/Private/makeUrlServer',
    '../../milkman/Private/request',
    '../../milkman/Utils/constants'
    ], function ( validation, schema, makeUrlServer, request, constants ) {
        'use strict';

    /**
     * Verify mandatory parameters are passed to the method and will save in local storage
     * session token, proposal id and merchant details
     *
     *  @PARAM: [ Object, Object ]
     *  @PARAM: Function
     *
     *  milkman.setInit({ publishable_key, redirectUri, externalTrackingCode, city, postalCode, cart }, function( results ){
     *      // ... code here ...
     *  })
     */

    return function setInit( data, callback ) {
        var url = makeUrlServer('/setInit');

        /**
         *  CHECK for required fields:
         *  publishable_key
         *  city
         *  postal code
         *  server merchant's URL
         *  tracking code
         *  cart
         *  parcels
         */
       constants.parseKeys = {
           "applicationId": "JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
           "javascriptKey": "bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
       };

        validation( JSON.stringify(data), schema.setInitOrder, function(){

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

            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            if( data.pickUp.hubId ||
                data.pickUp.address ||
                isNumber(data.pickUp.lat) && isNumber(data.pickUp.lng) ) {

                request(url, 'POST', {
                    redirectUri: data.redirectUri,
                    publishableKey: data.publishableKey,
                    city: data.city,
                    postalCode: data.postalCode,
                    externalTrackingCode: data.externalTrackingCode,
                    subsidyCost: data.subsidyCost,
                    standardCost: data.standardCost,
                    firstAvailability: data.standardCost,
                    pickUp: JSON.stringify(data.pickUp)
                }, function (response) {

                    if (response.success) {
                        /** RESPONSE EXAMPLE
                         *  {
                            * "merchant": {
                            *    "atomicIntervalDimension":10,
                            *    "email":"test@milkman_test.it",
                            *    "maxDuration":12,
                            *    "minDuration":3,
                            *    "name":"merchant",
                            *    "quoteNumber":1,
                            *    "quotesPerDay":1
                            * },
                            * "session": {
                            *    "_id":"000000000",
                            *    "isActive":true,
                            *    "proposalId":"000000001"
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
                    else {
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
                    error_message: constants.STATUS.ERROR_MESSAGE._415
                });
            }


        }, function( order_error ){
            callback({status: 'failure', text: order_error.messageError});
        });
    }
});