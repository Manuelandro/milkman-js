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
        return function getQuote( options, callback ) {
            var ranges = options.range ?     //verifico che l'utente abbia definito un range di interesse,
                    options.range :          //in caso contrario ne assegno uno di default
                    [window.localStorage.getItem(constants.DEFAULT_RANGE)],
                merchant = JSON.parse(window.localStorage.getItem( constants.MERCHANT )),
                bh_int = merchant.bhInterval.split('/');

            //IF: check options existence
            if( Object.keys(options).length )
            {
                rangeNormalization( ranges, bh_int[0], bh_int[1], function( formatted ){

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
                engine( ranges, callback );
            }
        };


        function engine(ranges, callback){
            checkMissingDates( ranges, function( missings ){
                //se ci sono intervalli mancanti faccio una quotation al sever
                //e filtro tutti gli intervalli per trovare quelli di interesse
                quotation(ranges, missings, function( ioi ){
                    //calcolo il prezzo con sconto
                    setPrice(ranges, ioi, callback);
                });
            });
        }
    });
