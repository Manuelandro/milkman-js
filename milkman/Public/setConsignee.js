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
        return function setConsignee( data, callback ) {
            var url = makeUrlServer('/setDetails'),
                isInitialized = checkRequiredFields('init');

            //CHECK required field
            if( isInitialized ){

                request( url, 'POST', {
                    sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                    publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                    proposalId: window.localStorage.getItem( constants.PROPOSAL_ID),
                    consignee: JSON.stringify(data)
                }, function( response ) {

                    if ( response.success )
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
                            text: response.error
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