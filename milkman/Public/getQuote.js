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
            var opt = {},
                isInitialized = checkRequiredFields('all');

            if( isInitialized ){

                /** verifico che le options in ingresso siano nel formato giusto, ovvero un hash*/
                if( typeof options === 'object' && !Array.isArray(options) ) { //&& Object.keys(range).length ) {
                    /**HISTORY TRACKING on server */
                    quoteHistory('getQuote', options);

                    /**GENERALS */
                    /**verifico che l'utente abbia definito un range di interesse,
                     * in caso contrario ne assegno uno di default */
                    opt.ranges = options.ranges ?
                        options.ranges : [window.localStorage.getItem(constants.DEFAULT_RANGE)];

                    /** verifico che ci sia un range */
                    if( opt.ranges.length ){
                        /**RANGE MANAGES */
                        opt.weekdays = options.weekdays ?
                            options.weekdays : null;
                        opt.hours = options.hours ?
                            options.hours : null;
                        opt.morning = options.morning ?
                            options.morning : true;
                        opt.afternoon = options.afternoon ?
                            options.afternoon : true;

                        /**IF: check options existence */
                        if( Object.keys(options).length )
                        {
                            //console.log(JSON.stringify(opt));
                            rangeNormalization( opt, function( formatted ){

                                //console.log(JSON.stringify('formatted: '+formatted.ranges));
                                //[success, ranges]
                                if( formatted.success ){
                                    opt.ranges = formatted.ranges;
                                    quoteEngine( 'getQuote', opt, callback );

                                } else {
                                    callback({
                                        status: 'failure',
                                        text: formatted.text
                                    });
                                }
                            });
                        }
                        /**ELSE: none options, we use defaults */
                        else {
                            quoteEngine( 'getQuote', opt, callback );
                        }

                    } else {  /**ELSE: errore, non c'è nessun range */
                    callback({
                        status: 'failure',
                        text: constants.STATUS.FAILURE._400,
                        errorMessage: constants.STATUS.ERROR_MESSAGE._404
                    });
                    }


                } else {  /** is not an hash*/
                    //console.log('3');
                    callback({
                        status: 'failure',
                        text: constants.STATUS.FAILURE._400,
                        errorMessage: constants.STATUS.ERROR_MESSAGE._407
                    });
                }

            } else {  /** isInitialized === false  */
                //console.log('3');
                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE._400,
                    errorMessage: constants.STATUS.ERROR_MESSAGE._411
                });
            }

        };

    });
