define(['moment',
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/Private/checkAddress',
        '../../milkman/Private/checkRequiredFields'
    ],
    function ( moment, makeUrlServer, request, constants, checkAddress, checkRequiredFields ) {
        'use strict';

        /**
         *  set a different address for this session
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function setAddress( data, callback ) {
            var url = makeUrlServer('/sessionDetails'),
                setInit_isDone = checkRequiredFields('init');

            /** CHECK required field */
            if( setInit_isDone ){
                /** verifico che gli address siano in un array */
                var tmp_data = Array.isArray(data) ? data : [data];
                checkAddress( tmp_data, function( normaAddresses, error ){

                    //console.log('normaAddresses: '+JSON.stringify(normaAddresses));
                    //console.log('length: '+JSON.stringify(normaAddresses.length));

                    /** verifico che ci sia almeno un risultato valido*/
                    if( normaAddresses.length ){
                        request( url, 'PUT', {
                            sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                            publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                            proposalId: window.localStorage.getItem( constants.PROPOSAL_ID),
                            address: normaAddresses
                        }, function( result ) {

                            if ( result.success )
                            {
                                /** salvo nel local storage gli addresses */
                                window.localStorage.setItem(constants.ADDRESSES, JSON.stringify(normaAddresses));

                                /** verifico che tutti gli addresses rispettino i vincoli */
                                if( error ){
                                    callback({
                                        status: 'warning',
                                        text: constants.STATUS.WARNING._301
                                    });
                                }
                                else if( normaAddresses.length === data.length ) {

                                    /** presa dell'hub */
                                    window.localStorage.setItem(
                                        constants.HUB, JSON.stringify(result.data.hub)
                                    );

                                    var merchant = window.localStorage.getItem(constants.MERCHANT);


                                    /** definisco il range di default per getQuote e findQuote */
                                    var firstDay = result.data.hub.firstAvailability,
                                        lastDay =  moment( result.data.hub.firstAvailability ).add(
                                            merchant.defaultRangeDays, 'd' ).format('YYYY-MM-DD'),
                                        lastHour = result.data.hub.bhInterval.split('/')[1];

                                    window.localStorage.setItem(
                                        constants.DEFAULT_RANGE, firstDay + '/' + lastDay + 'T' + lastHour );

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
                                            defaultRangeDays: merchant.defaultRangeDays
                                        },
                                        text: constants.STATUS.SUCCESS._200
                                    });
                                }
                                else {
                                    callback({
                                        status: 'warning',
                                        text: constants.STATUS.WARNING._302
                                    });
                                }
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
                            text: constants.STATUS.FAILURE._400,
                            errorMessage: constants.STATUS.ERROR_MESSAGE._410
                        });
                    }

                });

            } else {
                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE.BAD_REQUEST_400,
                    errorMessage: constants.STATUS.ERROR_MESSAGE._408
                });
            }
        }
    });