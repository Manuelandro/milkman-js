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
        var url = makeUrlServer('/getETA');

        //validation( JSON.stringify(data), schema.getTrackingPage, function(){
            request( url, 'POST', data, function( response ) {
                console.log(JSON.stringify(response));
                callback({
                    status: response.success ? 'success' : 'failure',
                    result: response,
                    text: response.success ? constants.STATUS.SUCCESS._200 : response.error
                });
            });
        //}, function(data_error){
        //    callback({status: 'failure', text: data_error.messageError});
        //});
    }
});