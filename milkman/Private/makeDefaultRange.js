//module in the same directory as constants.js
//define(["./constants.js"], function( constants ) {
//
//        return function makeUrlServer( path ) {
//            return constants.API_URL_SERVER + path;
//        };
//
//    }
//);

define( function() {
        'use strict';

        return function makeDefaultRange( from_day, from_time, to_day, to_time ) {
            return from_day + 'T' + from_time + '/' + to_day + 'T' + to_time;

        };

    }
);