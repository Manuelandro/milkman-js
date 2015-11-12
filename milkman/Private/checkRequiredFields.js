define( [ '../../milkman/Utils/constants'
    ], function( constants ) {
        'use strict';

        /**
         * The Address requires to be acceptable "address" field or both "lat" and "lng" fields
         *
         *  @PARAM: Array
         *
         */

        return function checkRequiredFields( type ) {
            var p_key = window.localStorage.getItem( constants.PUBLISHABLE_KEY ),
                uri = window.localStorage.getItem( constants.REDIRECT_URI ),
                proposal_id = window.localStorage.getItem( constants.PROPOSAL_ID ),
                addresses = window.localStorage.getItem( constants.ADDRESSES );

            switch (type){
                case 'init':
                    return p_key && uri && proposal_id;

                case 'all':
                    return p_key && uri && proposal_id && addresses;
            }
        };
    }
);
