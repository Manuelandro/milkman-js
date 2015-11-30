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
                                    callback({
                                        status: 'success',
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