define([
    'validate',
    '../../milkman/Private/makeUrlServer',
    '../../milkman/Private/request',
    '../../milkman/Utils/constants'
], function ( v, makeUrlServer, request, constants ) {
    'use strict';

    return function createOrder( data, keys, callback ) {
        var url = makeUrlServer('/createOrder');

        //var constraints = {
        //    name: {
        //        presence: true
        //    },
        //    // This is so the country doesn't get removed when cleaning the attributes
        //    country: {}
        //};
        //var attributes = {
        //    name: "Nicklas",
        //    country: "Sweden",
        //    someMaliciousAttribute: "scary value"
        //};

        //validation( {}, constraints, function( res ){
        //    console.log('res: '+res.valid);
        //}, function( error ){
        //    console.log('error: '+error.error);
        //});

        if(
            v.isString(keys.applicationId) && !v.isEmpty(keys.applicationId) &&
            v.isString(keys.javascriptKey) && !v.isEmpty(keys.javascriptKey)
        ){
            constants.parseKeys = keys;
        }

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

        //data.forEach(function(params){
        //    console.log('forEach');
        //    manager(params, function( res ){
        //        console.log('createOrder: '+res.success);
        //    });
        //
        //
        //
        //    ////validation( JSON.stringify(params), schema.order, function( res ){
        //    //
        //    //    request( url, 'POST', JSON.stringify(params), function( response ) {
        //    //
        //    //        console.log('createOrder!');
        //            callback({
        //                status: response.success ? 'success' : 'failure',
        //                text: response.success ? constants.STATUS.SUCCESS._200 : response.error
        //            });
        //    //    });
        //    //    //setTimeout( , 2000);
        //    //
        //    ////}, function( error ){
        //    ////    callback({
        //    ////        status: 'failure',
        //    ////        text: error.messageError
        //    ////    });
        //    ////});
        //
        //});

    }
});