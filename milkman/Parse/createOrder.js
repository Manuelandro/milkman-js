define([
    'validate',
    '../../milkman/Private/makeUrlServer',
    '../../milkman/Private/request',
    '../../milkman/Utils/constants'
], function ( v, makeUrlServer, request, constants ) {
    'use strict';

    return function createOrder( data, callback ) {
        var url = makeUrlServer('/createOrder');

        //if(
        //    v.isString(keys.applicationId) && !v.isEmpty(keys.applicationId) &&
        //    v.isString(keys.javascriptKey) && !v.isEmpty(keys.javascriptKey)
        //){
        //    constants.parseKeys = keys;
        //}

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
                    text: result.success ? constants.STATUS.SUCCESS._200 : result.error
                });
            });
        });
    }
});