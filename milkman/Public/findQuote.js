define(['moment',
        '../../milkman/Utils/constants',
        '../../milkman/Private/rangeNormalization',
        '../../milkman/Private/checkMissingDates',
        '../../milkman/Private/setPrice',
        '../../milkman/Private/quotation'
    ],
    function ( moment, constants, rangeNormalization, checkMissingDates, setPrice, quotation ) {
        'use strict';

        /**
         *
         *  @PARAM: String
         *  @PARAM: Function
         */
        return function findQuote( options, callback ) {
            //verifico che l'utente abbia definito questi parametri di interesse,
            //in caso contrario ne assegno uno di default
            var opt = {},
                merchant = JSON.parse(window.localStorage.getItem( constants.MERCHANT )),
                bh_int = merchant.bhInterval.split('/');

            opt.ranges = options.range ?
                options.range :
                [window.localStorage.getItem(constants.DEFAULT_RANGE)];
            opt.quoteNumber = options.quoteNumber ?
                options.quoteNumber :
                merchant.quoteNumber;
            opt.maxDuration = options.maxDuration ?
                options.maxDuration :
                merchant.maxDuration;
            opt.quotesPerDate = options.quotesPerDate ?
                options.quotesPerDate :
                merchant.quotesPerDate;

            //IF: check options existence
            if( Object.keys(options).length )
            {
                rangeNormalization( opt.ranges, bh_int[0], bh_int[1], function( formatted ){

                    if( formatted.success ){

                        engine( formatted.ranges, callback );

                    } else {
                        callback( formatted );
                    }
                });
            }
            //ELSE: none options, we use defaults
            else
            {
                engine( opt, callback );
            }
        };

        function engine(opt, callback){
            checkMissingDates( opt.ranges, function( missings ){
                //se ci sono intervalli mancanti faccio una quotation al sever
                //e filtro tutti gli intervalli per trovare quelli di interesse
                quotation(opt.ranges, missings, function( ioi ){
                    //calcolo il prezzo con sconto
                    findPrice(opt, ioi, callback);
                });
            });
        }

    });