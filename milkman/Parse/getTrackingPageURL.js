define([
    'validate',
    '../../milkman/Private/makeUrlServer',
    '../../milkman/Private/request',
    '../../milkman/Utils/constants',
    '../../milkman/Private/paramsValidator',
    '../../milkman/Utils/schema'
], function ( v, makeUrlServer, request, constants, validation, schema ) {
    'use strict';

    return function getTrackingPageURL( data, callback ) {
        var url = makeUrlServer('/getTrackingPageURL');

        //validation( JSON.stringify(data), schema.getTrackingPage, function(){
            request( url, 'POST', data, function( response ) {
                callback({
                    status: result.success ? 'success' : 'failure',
                    result: response.result,
                    text: result.success ? constants.STATUS.SUCCESS._200 : result.error
                });
            });
        //}, function(data_error){
        //    callback({status: 'failure', text: data_error.messageError});
        //});
    }
});