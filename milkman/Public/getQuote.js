define(['moment',
        '../../milkman/Utils/constants',
        '../../milkman/Private/rangeNormalization',
        '../../milkman/Private/quoteEngine',
        '../../milkman/Private/quoteHistory',
        '../../milkman/Private/checkRequiredFields'
    ],
    function ( moment, constants, rangeNormalization, quoteEngine, quoteHistory, checkRequiredFields ) {
        'use strict';

        /**
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function getQuote( options, callback ) {
            var opt = {}, isInitialized = checkRequiredFields('init');

            if( isInitialized ){
                //HISTORY TRACKING on server
                quoteHistory('getQuote', options);

                //GENERALS
                opt.ranges =  options.range ?     //verifico che l'utente abbia definito un range di interesse,
                    options.range :          //in caso contrario ne assegno uno di default
                    [window.localStorage.getItem(constants.DEFAULT_RANGE)];

                //RANGE MANAGES
                opt.weekdays = options.weekdays ?
                    options.weekdays : null;
                opt.hours = options.hours ?
                    options.hours : null;
                opt.morning = options.morning ?
                    options.morning : true;
                opt.afternoon = options.afternoon ?
                    options.afternoon : true;

                //IF: check options existence
                if( Object.keys(options).length )
                {
                    rangeNormalization( opt, function( formatted ){

                        if( formatted.success ){
                            opt.ranges = formatted.ranges;
                            quoteEngine( 'getQuote', opt, callback );

                        } else {
                            callback( formatted );
                        }
                    });
                }
                //ELSE: none options, we use defaults
                else
                {
                    quoteEngine( 'getQuote', opt, callback );
                }


            } else {  //isInitialized === false
                callback({
                    success: false,
                    text: constants.ERROR.BAD_REQUEST_400,
                    errorMessage: 'You need to set required fields before.'
                });
            }

        };
    });
