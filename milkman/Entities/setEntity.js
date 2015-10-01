/**
 * Set a single entity by id
 *
 *  @PARAM: String
 *  @PARAM: Map
 *  @PARAM: Function
 *
 *  milkman.getEntities('user', id, foo)
 */

define([ '../Private/makeUrlServer', '../Private/request' ],
    function ( makeUrlServer, request ) {
    'use strict';

    return function setEntity(entity, id, data, callback) {

        var url = makeUrlServer( '/' + entity + '/' + id );

        request( url, 'PUT', data, function( result ){

            result.success ?
                callback({
                    success: true,
                    data: result.data
                }) :
                callback({
                    success: false,
                    text: result.jqXHR
                });

        });
    }
});