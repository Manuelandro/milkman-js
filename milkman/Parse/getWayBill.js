define([
    'jszip.min',
    'validate',
    '../../milkman/Private/makeUrlServer',
    '../../milkman/Private/request',
    '../../milkman/Utils/constants',
    '../../milkman/Private/paramsValidator',
    '../../milkman/Utils/schema'
], function ( JSZip, v, makeUrlServer, request, constants, validation, schema ) {
    'use strict';

    return function getTrackingPageURL( data, callback ) {
        var url = makeUrlServer('/getWayBill');

        //validation( JSON.stringify(data), schema.getWayBill, function(){
            request( url, 'POST', data, function( response ) {

                //function base64ToBuffer(str){
                //    str = window.atob(str);
                //    var buffer = new ArrayBuffer(str.length),
                //        view = new Uint8Array(buffer);
                //    for(var i = 0; i < str.length; i++){
                //        view[i] = str.charCodeAt(i);
                //    }
                //    return buffer;
                //}
                //
                //var buffer = base64ToBuffer( response.result.file.content );
                //var zip = new JSZip(buffer);
                //
                //window.location = "data:application/zip;base64," + zip.generate({type:"base64"});

                callback({
                    status: result.success ? 'success' : 'failure',
                    result: response.file.content,
                    text: result.success ? constants.STATUS.SUCCESS._200 : result.error
                });
            });
        //}, function(data_error){
        //    callback({status: 'failure', text: data_error.messageError});
        //});
    }
});