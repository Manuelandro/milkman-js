define(['../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/Private/checkRequiredFields'
    ],
    function ( makeUrlServer, request, constants, checkRequiredFields ) {
        'use strict';

        /**
         *  set a different address for this session
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function setCart( data, callback ) {
            var url = makeUrlServer('/sessionDetails'),
                isInitialized = checkRequiredFields('init');

            //CHECK required field
            if( isInitialized && data.value && data.firstAvailableDay && data.auxCost ){

                request( url, 'PUT', {
                    sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                    publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                    address: data
                }, function( result ) {

                    if ( result.success )
                    {
                        //salvo localmente il riferimento all'avvenuto salvataggio dell'address
                        window.localStorage.setItem(constants.REQUIRED_CART, true);

                        callback({
                            success: true,
                            text: constants.STATUS.SUCCESS._200
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
                if( isInitialized ){
                    callback({
                        success: false,
                        text: constants.STATUS.FAILURE._400,
                        errorMessage: constants.STATUS.ERROR_MESSAGE._412
                    });
                } else {
                    callback({
                        success: false,
                        text: constants.STATUS.FAILURE._400,
                        errorMessage: constants.STATUS.ERROR_MESSAGE._411
                    });
                }

            }
        }
    });