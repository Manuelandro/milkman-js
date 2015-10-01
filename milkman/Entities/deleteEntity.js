/**
 * Delete an existing entity
 *
 *  @PARAM: String
 *  @PARAM: Map
 *  @PARAM: Function
 *
 *  milkman.deleteEntity('user', id, foo)
 */

define([ '../Private/makeUrlServer', '../Private/request' ],
    function ( makeUrlServer, request ) {
    'use strict';

    return function deleteEntity(entity, id, callback) {

        var url = makeUrlServer( '/' + entity + '/' + id );

        request( url, 'DELETE', null, function( result ){

            result.success ?
                callback({
                    success: true
                }) :
                callback({
                    success: false,
                    text: result.jqXHR
                });

        });
    }
});