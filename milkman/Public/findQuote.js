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
         *  returns the events ( price + range ) for a set of options
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function findQuote( options, callback ) {
            //verifico che l'utente abbia definito questi parametri di interesse,
            //in caso contrario ne assegno uno di default
            var opt = {},
                isInitialized = checkRequiredFields('init'),
                merchant = JSON.parse(window.localStorage.getItem( constants.MERCHANT ));

            if( isInitialized ){
                //HISTORY TRACKING on server
                quoteHistory('findQuote', options);

                //BASIC USAGE
                opt.ranges =  options.range ?     //verifico che l'utente abbia definito un range di interesse,
                    options.range :          //in caso contrario ne assegno uno di default
                    [window.localStorage.getItem(constants.DEFAULT_RANGE)];
                opt.quoteNumber = options.quoteNumber ?
                    options.quoteNumber :
                    merchant.quoteNumber;
                opt.maxDuration = options.maxDuration ?        //durata massima dell'evento
                    options.maxDuration :
                    merchant.maxDuration;
                opt.quotePerDate = options.quotePerDate ?
                    options.quotePerDate :
                    merchant.quotePerDate;
                opt.overlap = options.overlap ?
                    options.overlap :
                    merchant.overlap;
                opt.minDuration = options.minDuration ?        //durata massima dell'evento
                    options.minDuration : 1;

                //RANGE MANAGES
                opt.weekdays = options.weekdays ?
                    options.weekdays : null;
                opt.hours = options.hours ?
                    options.hours : null;
                opt.morning = options.morning ?
                    options.morning : null;
                opt.afternoon = options.afternoon ?
                    options.afternoon : null;

                //PRICE MANAGES
                opt.distribution = options.distribution ?
                    options.distribution : null;


                //IF: check options existence
                if( Object.keys(options).length )
                {

                    rangeNormalization( opt, function( formatted ){

                        if( formatted.success ){
                            opt.ranges = formatted.ranges;
                            quoteEngine( 'findQuote', opt, callback );
                        }
                        else {
                            callback({
                                status: 'failure',
                                text: formatted.text
                            });
                        }
                    });
                }
                //ELSE: none options, we use defaults
                else {
                    quoteEngine( 'findQuote', opt, callback );
                }


            } else {  //isInitialized === false
                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE.BAD_REQUEST_400,
                    errorMessage: constants.ERROR_MESSAGE.NEED_REQUIRED
                });
            }
        };
    });