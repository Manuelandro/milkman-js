
define(["../../milkman/Utils/constants"],
    function(constants) {
        'use strict';

        return function makeUrlServer( path ) {
            return constants.API_URL_SERVER + path;
        };

    }
);