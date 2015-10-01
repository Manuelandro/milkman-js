//module in the same directory as constants.js
//define(["./constants.js"], function( constants ) {
//
//        return function makeUrlServer( path ) {
//            return constants.API_URL_SERVER + path;
//        };
//
//    }
//);

define(["../../milkman/Utils/constants"], function(constants) {
        'use strict';

        return function makeUrlServer( path ) {
            return constants.API_URL_SERVER + path;
        };

    }
);