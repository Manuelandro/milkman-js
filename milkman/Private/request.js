
define([ 'jquery',
        '../../milkman/Utils/constants' ],
    function ( $, constants ) {
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
            var session_token = window.localStorage.getItem( constants.SESSION_TOKEN );

            //if( session_token ){

                return $.ajax({
                    url : url, //+ '?token=' + session_token,
                    type: type,
                    data : data ? data : null,
                    dataType: "json",
                    timeout: 8000,
                    success: function(data_results, textStatus, jqXHR)
                    {
                        callback({
                            success: true,
                            data: data_results,
                            textStatus: textStatus,
                            jqXHR: jqXHR
                        });
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        callback({
                            success: false,
                            jqXHR: jqXHR,
                            textStatus: textStatus,
                            errorThrown: errorThrown
                        });
                    }
                });

            //} else {
            //
            //    callback({'success': false, text: 'Authentication credentials are missing or incorrect.'});
            //
            //}
        }
    });