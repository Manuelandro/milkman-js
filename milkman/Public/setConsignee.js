define([
        '../../milkman/Private/paramsValidator',
        '../../milkman/Utils/schema',
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/Private/checkRequiredFields'
    ],
    function ( validation, schema, makeUrlServer, request, constants, checkRequiredFields ) {
        'use strict';

        /**
         *  set a different address for this session
         *
         *  @PARAM: String
         *  @PARAM: Function
         *
         *  milkman.setConsignee({ consignee }, function( results ){
         *      // ... code here ...
         *  })
         */
        return function setConsignee( data, callback ) {
            var url = makeUrlServer('/setDetails'),
                setInit_isDone = checkRequiredFields('init');

            //CHECK required field
            if( setInit_isDone ){

                if( data.firstName &&
                    data.lastName &&
                    data.email ) {

                    validation( JSON.stringify(data), schema.checkConsignee, function(){

                        request( url, 'POST', {
                            sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                            publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                            proposalId: window.localStorage.getItem( constants.PROPOSAL_ID),
                            consignee: data
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

                    }, function( order_error ){
                        callback({status: 'failure', text: order_error.messageError});
                    });
                } else {

                    callback({
                        status: 'failure',
                        text: constants.STATUS.FAILURE._400,
                        errorMessage: constants.STATUS.ERROR_MESSAGE._408
                    });
                }
            } else {

                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE._400,
                    errorMessage: constants.STATUS.ERROR_MESSAGE._408
                });
            }

        }
    });