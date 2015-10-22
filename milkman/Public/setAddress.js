define(['../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants'
    ],
    function ( makeUrlServer, request, constants ) {
        'use strict';

        /**
         *  set a different address for this session
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function setAddress( data, callback ) {
            var url = makeUrlServer('/sessionDetails');

            if(          // CHECK che l'utente abbia inserito:
            data.address ||
            isNumber(data.lat) && isNumber(data.lng)
            ){
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
                    errorMessage: 'Address or Lat&Lng are required fields.'
                });
            }


            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
        }
    });