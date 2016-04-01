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
        var url = makeUrlServer('/setParcel');

        //if(
        //    v.isString(keys.applicationId) && !v.isEmpty(keys.applicationId) &&
        //    v.isString(keys.javascriptKey) && !v.isEmpty(keys.javascriptKey)
        //){
        //    constants.parseKeys = keys;
        //}

        //validation( JSON.stringify(data), schema.setParcel, function(){
        //    if(data.parcels){
        //        validation( JSON.stringify(data.parcels), schema.parcels, function(){
                    request( url, 'POST', data, function( response ) {
                        callback({
                            status: result.success ? 'success' : 'failure',
                            result: response.result,
                            text: result.success ? constants.STATUS.SUCCESS._200 : result.error
                        });
                    }, function(parcels_error){
                        callback({status: 'failure', text: parcels_error.messageError});
                    });
                //}, function(data_error){
                //    callback({status: 'failure', text: data_error.messageError});
                //});
            //}

        //});
    }
});