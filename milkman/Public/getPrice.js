define(['moment',
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/Private/rangeNormalization',
        '../../milkman/Private/checkRequiredFields'
    ],
    function ( moment, makeUrlServer, request, constants, rangeNormalization, checkRequiredFields ) {
        'use strict';

        /**
         *  verifico che
         *  1) le options in ingresso siano nel formato giusto, ovvero un hash
         *  2) l'utente abbia definito un range di interesse, in caso contrario ne assegno uno di default
         *  3) ci sia almeno un range
         *  4) ci siano opzioni in ingresso che mi obblighino a fare una normalizazzione dei ranges
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function getPrice( options, callback ) {
            var opt = {},
                isInitialized = checkRequiredFields('all');

            /** 1) */
            if( isInitialized && typeof options === 'object' && !Array.isArray(options) ) {
                /** 2) */
                opt.ranges = options.ranges ?
                    options.ranges :
                    [window.localStorage.getItem(constants.DEFAULT_RANGE)];

                /** 3) */
                if ( !opt.ranges.length ) { /** non c'è nessun range */
                    callback({
                        status: 'failure',
                        text: constants.STATUS.FAILURE._400,
                        errorMessage: constants.STATUS.ERROR_MESSAGE._404 });
                }
                else
                {
                    /**RANGE MANAGES */
                    opt.weekdays =  options.weekdays ?  options.weekdays :  null;
                    opt.hours =     options.hours ?     options.hours :     null;
                    opt.morning =   options.morning ?   options.morning :   true;
                    opt.afternoon = options.afternoon ? options.afternoon : true;

                    /** 4) */
                    if (!Object.keys(options).length) { /** nessuna opzione */
                        parseRequest(JSON.stringify(opt.ranges), callback);
                    }
                    else
                    {
                        rangeNormalization(opt, function (r) {
                            r.success ?
                                parseRequest(JSON.stringify(r.ranges), callback) :
                                callback({ status: 'failure', text: r.text });
                        });
                    }
                }
            }
            else {
                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE._400,
                    errorMessage: !isInitialized ?
                        constants.STATUS.ERROR_MESSAGE._411 :
                        constants.STATUS.ERROR_MESSAGE._407
                });
            }

            /**
             * chiamata a Parse
             *
             * @param ranges
             * @param callback
             */
            function parseRequest( ranges, callback ){
                var url = makeUrlServer('/quotation');

                request(url, 'POST', {
                    sessionId: window.localStorage.getItem(constants.SESSION_TOKEN),
                    publishableKey: window.localStorage.getItem(constants.PUBLISHABLE_KEY),
                    proposalId: window.localStorage.getItem(constants.PROPOSAL_ID),
                    quotationType: 'getQuote',
                    ranges: ranges
                }, function (r) {
                    callback({
                        status: r.success ? 'success' : 'failure',
                        text: r.success ? constants.STATUS.SUCCESS._200 : r.error
                    });
                });
            }
        };
    });


