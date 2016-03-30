define(['moment',
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/Private/checkRequiredFields'
    ],
    function ( moment, makeUrlServer, request, constants, checkRequiredFields ) {
        'use strict';

        /**
         *  get intervals and prices for the given day
         *
         *  @PARAM: String
         *  @PARAM: Function
         *
         *  milkman.getMultiplePrices({ date }, function( results ){
         *      // ... code here ...
         *  })
         */
        return function getMultiplePrices( data, callback ) {
            var url = makeUrlServer('/getMultiplePrices'),
                isInitialized = checkRequiredFields('all');

            /** check setInit and setAddress are completed */
            if( isInitialized ) {
                if( moment(data.date, 'YYYY-MM-DD').isValid() ){
                    request( url, 'POST', {
                        sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                        publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                        date: data.date
                    }, function( result ) {
                        if ( result.success )
                        {
                            callback({
                                status: 'success',
                                result: result,
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
                        text: constants.STATUS.FAILURE._400,
                        errorMessage: constants.STATUS.ERROR_MESSAGE._410
                    });
                }
            }
        }
    });