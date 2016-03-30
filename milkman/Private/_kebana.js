define([ 'moment',
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request'],
    function ( moment, makeUrlServer, request ) {
        'use strict';

        /**
         * Verify mandatory parameters are passed to the method and returns session token with quotes
         *
         *  @PARAM: [ Object, Object ]
         *  @PARAM: Function
         *
         *  milkman.authenticate( publishable_key, foo )
         */

        return function kebana( type, url, data ) {

            if( type === 'POST' )  {
                request( url, 'POST', data);
            }


        }
    });