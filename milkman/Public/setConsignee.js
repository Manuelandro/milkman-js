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
                    proposalId: window.localStorage.getItem( constants.PROPOSAL_ID),
                    consignee: data
                }, function( result ) {

                    if ( result.success )
                    {
                        callback({
                            status: 'success',
                            text: constants.STATUS.SUCCESS._200
                        }, moment);
                    }
                    else
                    {
                        callback({
                            status: 'failure',
                            text: result.jqXHR
                        });
                    }
                })

            } else {

                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE._400,
                    errorMessage: constants.STATUS.ERROR_MESSAGE._408
                });
            }

        }
    });