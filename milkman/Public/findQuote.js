define(['moment',
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/Private/rangeNormalization',
        //'../../milkman/Private/quoteHistory',
        '../../milkman/Private/checkRequiredFields'
    ],
    function ( moment, request, makeUrlServer, constants, rangeNormalization, checkRequiredFields ) {
        'use strict';

        /**
         *  returns the events ( price + range ) for a set of options
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function findQuote( options, callback ) {
            /** verifico che l'utente abbia definito questi parametri di interesse,
            in caso contrario ne assegno uno di default */
            var opt = {},
                url = makeUrlServer('/quotation'),
                isInitialized = checkRequiredFields('init'),
                merchant = JSON.parse(window.localStorage.getItem( constants.MERCHANT ));

            if( isInitialized ){
                /** verifico che le options in ingresso siano nel formato giusto, ovvero un hash*/
                if( typeof options === 'object' && !Array.isArray(options) ) { //&& Object.keys(range).length ) {
                    /**HISTORY TRACKING on server */
                    //quoteHistory('getQuote', options);

                    /** BASIC USAGE */
                    if( options.ranges ){
                        opt.ranges =  options.ranges.length > 0 ?       /** verifico che l'utente abbia definito un range di interesse, */
                            options.ranges :          /**in caso contrario ne assegno uno di default    */
                            [window.localStorage.getItem(constants.DEFAULT_RANGE)];
                    } else {
                        opt.ranges = [window.localStorage.getItem(constants.DEFAULT_RANGE)];
                    }

                    opt.quoteNumber = options.quoteNumber ?
                        options.quoteNumber :
                        merchant.quoteNumber;
                    opt.maxDuration = options.maxDuration ?        /** durata massima dell'evento  */
                        options.maxDuration : merchant.maxDuration;
                    opt.quotePerDate = options.quotePerDate ?
                        options.quotePerDate :
                        merchant.quotePerDate;
                    opt.overlap = options.overlap ?
                        options.overlap :
                        merchant.overlap;
                    opt.minDuration = options.minDuration ?        /** durata massima dell'evento  */
                        options.minDuration : merchant.minDuration;

                    /** RANGE MANAGES */
                    opt.weekdays = options.weekdays ?
                        options.weekdays : null;
                    opt.hours = options.hours ?
                        options.hours : null;
                    opt.morning = options.morning ?
                        options.morning : null;
                    opt.afternoon = options.afternoon ?
                        options.afternoon : null;

                    /** PRICE MANAGES */
                    opt.distribution = options.distribution ?
                        options.distribution : null;


                    /** IF: check options existence */
                    if( Object.keys(options).length )
                    {

                        rangeNormalization( opt, function( formatted ){

                            if( formatted.success ){

                                opt.ranges = formatted.ranges;

                                request( url, 'POST', {
                                    sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                                    publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                                    proposalId: window.localStorage.getItem( constants.PROPOSAL_ID),
                                    quotationType: 'findQuote',
                                    options: JSON.stringify(opt)
                                }, function( response ) {

                                    if ( response.success )
                                    {
                                        callback({
                                            status: 'success',
                                            text: constants.STATUS.SUCCESS._200
                                        });
                                    }
                                    else
                                    {
                                        callback({
                                            status: 'failure',
                                            text: response.error
                                        });
                                    }
                                });

                                //quoteEngine( 'findQuote', opt, callback );
                            }
                            else {
                                callback({
                                    status: 'failure',
                                    text: formatted.text
                                });
                            }
                        });
                    }
                    /** ELSE: none options, we use defaults */
                    else {

                        request( url, 'POST', {
                            sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                            publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY),
                            proposalId: window.localStorage.getItem( constants.PROPOSAL_ID),
                            quotationType: 'findQuote',
                            options: JSON.stringify(opt)
                        }, function( response ) {

                            if ( response.success )
                            {
                                callback({
                                    status: 'success',
                                    text: constants.STATUS.SUCCESS._200
                                });
                            }
                            else
                            {
                                callback({
                                    status: 'failure',
                                    text: response.error
                                });
                            }
                        });

                        //quoteEngine( 'findQuote', opt, callback );
                    }

                } else {  /** is not an hash*/
                    //console.log('3');
                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE._400,
                    errorMessage: constants.STATUS.ERROR_MESSAGE._407
                });
                }

            } else {  /** isInitialized === false */
            callback({
                status: 'failure',
                text: constants.STATUS.FAILURE._400,
                errorMessage: constants.STATUS.ERROR_MESSAGE._411
            });
            }
        };
    });