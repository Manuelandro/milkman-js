define(
    function( moment, constants ) {
        'use strict';

        /**
         * The Address requires to be acceptable "address" field or both "lat" and "lng" fields
         *
         *  @PARAM: Array
         *
         */

        return function checkRequiredFields( type ) {
            var p_key = window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                uri = window.localStorage.getItem( constants.REDIRECT_URI),
                address = constants.requiredFields.address ,
                cart = constants.requiredFields.cart ;
            switch (type){
                case 'init':
                    return p_key && uri;
                case 'all':
                    return p_key && uri && address && cart;
            }
        };
    }
);
