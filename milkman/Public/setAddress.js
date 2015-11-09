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
            var url = makeUrlServer('/sessionDetails'), normalizedAddress,
                isInitialized = checkRequiredFields('init');

            //setto il fatto che i dati, ora come ora, sono inseriti dall'utente
            data['evaluatedLatLng'] = false;
            //CHECK required field
            if( isInitialized &&
                data.address || data.lat && data.lng ){

                checkAddress( data, function( normalizedAddress ){
                    console.log('normalizedAddress:'+JSON.stringify(normalizedAddress));
                    request( url, 'PUT', {
                        sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                        publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                        address: normalizedAddress
                    }, function( result ) {

                        if ( result.success )
                        {
                            //salvo localmente il riferimento all'avvenuto salvataggio dell'address
                            constants.requiredFields['address'] = true;

                            callback({
                                success: true,
                                data: normalizedAddress,
                                text: constants.SUCCESS.OK_200
                            });
                        }
                        else
                        {
                            callback({
                                success: false,
                                text: result.jqXHR
                            });
                        }
                    })
                });

            } else {

                if( isInitialized ){
                    callback({
                        success: false,
                        text: constants.ERROR.BAD_REQUEST_400,
                        errorMessage: 'Address or Lat&Lng are required fields.'
                    });
                } else {
                    callback({
                        success: false,
                        text: constants.ERROR.BAD_REQUEST_400,
                        errorMessage: 'You need to set publichable key and merchant URI before.'
                    });
                }

            }

            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

        }
    });