define(['../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/Private/checkAddress',
        '../../milkman/Private/checkRequiredFields'
    ],
    function ( makeUrlServer, request, constants, checkAddress, checkRequiredFields ) {
        'use strict';

        /**
         *  set a different address for this session
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function setConsignee( data, callback ) {
            var url = makeUrlServer('/sessionDetails'),
                isInitialized = checkRequiredFields('init');

            //CHECK required field
            if( isInitialized ){

                request( url, 'PUT', {
                    sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                    publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                    address: data
                }, function( result ) {

                    if ( result.success )
                    {
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
                })

            } else {

                callback({
                    success: false,
                    text: constants.ERROR.BAD_REQUEST_400,
                    errorMessage: 'You need to set publichable key and merchant URI before.'
                });
            }

        }
    });