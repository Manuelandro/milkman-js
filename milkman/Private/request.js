
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

            //if( session_token ){

                return JQ.ajax({
                    url : url, //+ '?token=' + session_token,
                    headers: {
                        "X-Parse-Application-Id":"JLosOIYAbKXW3FBvEZRvQIzI9EZ2ZyNqcJ8w5jit",
                        "X-Parse-Javascript-Key":"bGXMI4pBIdRFmnrNw1Y1njCSSTIYahPqJ3NlhUhk"
                    },
                    type: type,
                    data : data ? data : null,
                    dataType: "json",
                    timeout: 8000,
                    success: function(data, textStatus, jqXHR)
                    {

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
            //}
        }
    });