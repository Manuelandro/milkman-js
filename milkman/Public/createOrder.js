define(['../../milkman/Private/makeUrlServer',
    '../../milkman/Private/request',
    '../../milkman/Utils/constants'
], function ( makeUrlServer, request, constants ) {
    'use strict';

    return function createOrder( data, callback ) {
        var url = makeUrlServer('/createOrder');

        data.forEach(function(params){
            request( url, 'POST', params, function( response ) {

                callback({
                    status: response.success ? 'success' : 'failure',
                    text: response.success ? constants.STATUS.SUCCESS._200 : response.error
                });

            })
        });
    }
});