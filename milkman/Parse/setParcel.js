define([
    'validate',
    '../../milkman/Private/makeUrlServer',
    '../../milkman/Private/request',
    '../../milkman/Utils/constants',
    '../../milkman/Private/paramsValidator',
    '../../milkman/Utils/schema'
], function ( v, makeUrlServer, request, constants ) {
    'use strict';

    return function getTrackingPageURL( data, callback ) {
        var url = makeUrlServer('/setParcel');


        var result = [];
        function manager(data, callback){
            if(data.length == 0)
            {
                callback(result);
            }
            else
            {
                request( url, 'POST', JSON.stringify(data[data.length-1]), function( response ) {
                    result.push(response);
                    data.pop();
                    setTimeout( manager(data, callback), 2000);

                });
            }
        }

        manager(data, function( res ){
            res.forEach(function(result){
                callback({
                    status: result.success ? 'success' : 'failure',
                    result: result.result,
                    text: result.success ? constants.STATUS.SUCCESS._200 : result.error
                });
            });
        });


                    //request( url, 'POST', data, function( response ) {
                    //    callback({
                    //        status: result.success ? 'success' : 'failure',
                    //        result: response.result,
                    //        text: result.success ? constants.STATUS.SUCCESS._200 : result.error
                    //    });
                    //}, function(parcels_error){
                    //    callback({status: 'failure', text: parcels_error.messageError});
                    //});

    }
});