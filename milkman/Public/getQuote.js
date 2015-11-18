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
            var opt = {}, isInitialized = checkRequiredFields('all');

            if( isInitialized ){
                //HISTORY TRACKING on server
                quoteHistory('getQuote', options);

                //console.log('ranges: '+options.ranges);
                //console.log(options.ranges.length);

                //GENERALS
                if( options.ranges ){
                    opt.ranges =  options.ranges.length > 0 ?     //verifico che l'utente abbia definito un range di interesse,
                        options.ranges :          //in caso contrario ne assegno uno di default
                        [window.localStorage.getItem(constants.DEFAULT_RANGE)];
                } else {
                    opt.ranges = [window.localStorage.getItem(constants.DEFAULT_RANGE)];
                }

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
                    //console.log(JSON.stringify(opt));
                    rangeNormalization( opt, function( formatted ){

                       // console.log(JSON.stringify(formatted.text));
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
                //ELSE: none options, we use defaults
                else
                {
                    //console.log('2');
                    quoteEngine( 'getQuote', opt, callback );
                }


            } else {  //isInitialized === false
                //console.log('3');
                callback({
                    status: 'failure',
                    text: constants.STATUS.FAILURE.BAD_REQUEST_400,
                    errorMessage: constants.ERROR_MESSAGE.NEED_REQUIRED
                });
            }

        };
    });
