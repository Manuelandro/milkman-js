define([
        'moment',
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/Private/checkRequiredFields'
    ],
    function ( moment, makeUrlServer, request, constants, checkRequiredFields ) {
        'use strict';

        /**
         *  get weekdays and business hours for the delivery
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function getAvailability( data, callback ) {
            var url = makeUrlServer('/getAvailability'),
                setInit_setAddress_isDone = checkRequiredFields('all');

            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            var firstDay = moment(data.firstDay, 'YYYY-MM-DD').isValid() ?
                data.firstDay :
                window.localStorage.getItem(constants.HUB).split('T')[0],
                numberOfDays = isNumber(data.numberOfDays) ?
                    data.firstDay :
                    window.localStorage.getItem(constants.MERCHANT).numberOfDays;

            /** CHECK required field */
            if( setInit_setAddress_isDone ){
                request( url, 'POST', {
                    sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                    publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                    firstDay: firstDay,
                    numberOfDays: numberOfDays
                }, function( result ) {

                    if ( result.success )
                    {

                        callback({
                            status: 'success',
                            data: result.data,
                            text: constants.STATUS.SUCCESS._200
                        });

                    }
                    else
                    {
                        callback({
                            status: 'failure',
                            text: result.error
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