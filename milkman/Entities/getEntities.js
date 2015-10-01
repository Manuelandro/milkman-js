/**
 * List all available entity or a single id entity
 *
 *  @PARAM: String
 *  @PARAM: Map
 *  @PARAM: Function
 *
 *  milkman.getEntities('user', foo)
 *  milkman.getEntities('user', id, foo)
 */

define([ '../Private/makeUrlServer', '../Private/request' ],
    function ( makeUrlServer, request ) {
    'use strict';

    return function getEntities(entity, id, callback) {

        var url = id ?
            makeUrlServer( '/' + entity + '/' + id ) :
            makeUrlServer( '/' + entity );

        request( url, 'GET', null, function( result ){

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