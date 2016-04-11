
define([ 'jquery',
        '../../milkman/Utils/constants' ],
    function ( JQ, constants ) {
        'use strict';

        /**
         * Request to the server
         *
         *  @PARAM: String
         *  @PARAM: String
         *  @PARAM: Map
         *  @PARAM: Function
         *
         *  milkman.createEntity(url, POST/GET/PUT/DELETE, {name: 'Francesca', surname: 'Franci'}, foo)
         */


        return function request(url, type, data, callback) {
            //var session_token = window.localStorage.getItem( constants.SESSION_TOKEN );
            //console.log('JSON... '+JSON.stringify(data));
                return JQ.ajax({
                    url : url, //+ '?token=' + session_token,
                    //headers: {
                    //    "X-Parse-Application-Id": constants.parseKeys.applicationId,
                    //    "X-Parse-Javascript-Key": constants.parseKeys.javascriptKey
                    //},
                    type: type,
                    data : JSON.stringify(data),
                    dataType: "json",
                    timeout: 20000,
                    success: function(data, textStatus, jqXHR)
                    {
                        //console.log('success... ');
                        callback(data.result);
                        //callback({
                        //    success: true,
                        //    data: data_results,
                        //    textStatus: textStatus,
                        //    jqXHR: jqXHR
                        //});
                    },
                    error: function(data)//jqXHR, textStatus, errorThrown)
                    {

                        //console.log('error... '+data);
                        var error = JSON.parse(data.responseText);
                        callback({
                            success: false,
                            error: error.error
                        });
                        //callback({
                        //    success: false,
                        //    jqXHR: jqXHR,
                        //    textStatus: textStatus,
                        //    errorThrown: errorThrown
                        //});
                    }
                });

            //} else {
            //
            //    callback({'success': false, text: 'Authentication credentials are missing or incorrect.'});
            //
            }

    });