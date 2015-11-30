define([
    '../../milkman/Private/makeUrlServer',
    '../../milkman/Private/request',
    '../../milkman/Utils/constants',
    'moment',
       // '../../milkman/Private/checkAddress'],
    '../../milkman/Private/checkCart'
    ], function ( makeUrlServer, request, constants, moment, checkCart ) {
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

        /**
         *  CHECK for required fields:
         *  publishable_key
         *  server merchant's URL
         *  trackingCode
         *  parcels
         */
        if(
            data.publishableKey &&
            data.redirectUri &&
            data.trackingCode &&
            data.cart
        ){

            /** variables are saved in local storage */
            window.localStorage.setItem(
                constants.PUBLISHABLE_KEY, data.publishableKey
            );
            window.localStorage.setItem(
                constants.REDIRECT_URI, data.redirectUri
            );

            //per tenere traccia del salvataggio dei required field
            //window.localStorage.setItem(constants.REQUIRED_ADDRESS, false);
            //window.localStorage.setItem(constants.REQUIRED_CART, false);

            //OPTIONAL address field
            //if( data.address ){
            /**
             *  verifico che tutti i parcels abbiano i campi obbligatori
             *
             *  @returns solo i parcels che rispettano i vincoli richiesti
             */
            checkCart( data.cart, function( resaults ){

                /** verifico che tutti i parcels abbiano superato il check */
                if( resaults.length === data.cart.length ) {
                    request( url, 'POST', {
                        publishableKey: data.publishableKey,
                        redirectUri: data.redirectUri,
                        trackingCode: data.trackingCode,
                        parcels: data.cart
                        //address: normalizedAddress,
                        //consignee: data.consignee
                    }, function( result ) {

                        if ( result.success )
                        {

                            /** session id is saved in local storage */
                            window.localStorage.setItem(
                                constants.SESSION_TOKEN, result.data.session._id
                            );
                            window.localStorage.setItem(
                                constants.PROPOSAL_ID, result.data.session.proposalId
                            );
                            window.localStorage.setItem(
                                constants.MERCHANT, JSON.stringify(result.data.merchant)
                            );
                            window.localStorage.setItem(
                                constants.HUB, JSON.stringify(result.data.hub)
                            );

                            /** definisco il range di default per getQuote e findQuote */
                            var firstDay = result.data.hub.firstAvailability,
                                lastDay =  moment( result.data.hub.firstAvailability ).add(
                                    result.data.merchant.defaultRangeDays, 'd' ).format('YYYY-MM-DD'),
                                lastHour = result.data.hub.bhInterval.split('/')[1];

                                window.localStorage.setItem(
                                    constants.DEFAULT_RANGE, firstDay + '/' + lastDay + 'T' + lastHour );

                            //se ho tutti i dati richiesti in modo obbligatorio posso procedere con getQuote&findQuote
                            //if( normalizedAddress ){
                            //    if( normalizedAddress.address || normalizedAddress.lat && normalizedAddress.lng ){
                            //        window.localStorage.setItem(constants.REQUIRED_ADDRESS, true);
                            //    }
                            //}
                            callback({
                                status: 'success',
                                settings: {
                                    availableFriday: result.data.hub.availFri,
                                    availableMonday: result.data.hub.availMon,
                                    availableSaturday: result.data.hub.availSat,
                                    availableSunday: result.data.hub.availSun,
                                    availableThursday: result.data.hub.availThu,
                                    availableTuesday: result.data.hub.availTue,
                                    availableWednesday: result.data.hub.availWed,
                                    businessInterval: result.data.hub.bhInterval,
                                    firstAvailability: result.data.hub.firstAvailability,
                                    holidays: result.data.hub.holidays,
                                    localHolidays: result.data.hub.localHolidays,
                                    defaultRangeDays: result.data.merchant.defaultRangeDays
                                },
                                text: constants.STATUS.SUCCESS._200
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
                        text: constants.STATUS.FAILURE._401,
                        error_message: constants.STATUS.ERROR_MESSAGE._409
                    });
                }


            });
        } else {
            /** if required values are NOT available */
            callback({
                status: 'failure',
                text: constants.STATUS.FAILURE._401,
                error_message: constants.STATUS.ERROR_MESSAGE._410
            });
        }
    }
});