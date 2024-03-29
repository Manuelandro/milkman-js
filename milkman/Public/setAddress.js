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
         *  set the addresses for this session
         *
         *  @PARAM: String
         *  @PARAM: Function
         *
         *  milkman.setAddress({ [ address1, address2, ... ] }, function( results ){
         *      // ... code here ...
         *  })
         */
        return function setAddress( data, callback ) {
            var url = makeUrlServer('/setDetails'),
                setInit_isDone = checkRequiredFields('init');

            /** CHECK required field */
            if( setInit_isDone ){
                /** check address parameter is an Array */
                var tmp_data = Array.isArray(data) ? data : [data];
                checkAddress( tmp_data, function( normaAddresses, error ){

                    /** check at last one array's item is correct */
                    if( normaAddresses.length ){
                        request( url, 'POST', {
                            sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                            publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                            proposalId: window.localStorage.getItem( constants.PROPOSAL_ID),
                            address: normaAddresses
                        }, function( result ) {
                            if ( result.success )
                            {
                                /** save addresses on local storage */
                                window.localStorage.setItem(constants.ADDRESSES, JSON.stringify(normaAddresses));

                                /** if some address failed the check will sent a warning to the user */
                                if( error ){
                                    callback({
                                        status: 'warning',
                                        text: constants.STATUS.WARNING._301
                                    });
                                }
                                else if( normaAddresses.length === data.length ) {

                                    /** save hub on local storage */
                                    window.localStorage.setItem(
                                        constants.HUB, JSON.stringify(result.hub)
                                    );

                                    callback({
                                        status: 'success',
                                        settings: {
                                            firstAvailability: result.hub.firstAvailability
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