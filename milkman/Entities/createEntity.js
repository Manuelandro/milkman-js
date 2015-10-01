/**
 * Create a new entity
 *
 *  @PARAM: String
 *  @PARAM: Map
 *  @PARAM: Function
 *
 *  milkman.createEntity('user', {name: 'Francesca', surname: 'Franci'}, foo)
 */

define([ '../Private/makeUrlServer', '../Private/request' ],
    function ( makeUrlServer, request ) {
    'use strict';

    return function createEntity( entity, data, callback ) {
        var url = makeUrlServer( '/' + entity);

        request( url, 'POST', data, function( result ){

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