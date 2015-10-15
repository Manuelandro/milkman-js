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
            opt.maxDuration = options.maxDuration ?        //durata massima dell'evento
                options.maxDuration :
                merchant.maxDuration;
            opt.quotePerDate = options.quotePerDate ?
                options.quotePerDate :
                merchant.quotePerDate;

            //IF: check options existence
            if( Object.keys(options).length )
            {
                rangeNormalization( opt.ranges, bh_int[0], bh_int[1], function( formatted ){

                    if( formatted.success ){
                        opt.ranges = formatted.ranges;
                        engine( opt, callback );

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

                    //ritorna un array ordinato pre-filtrato con i possibili eventi
                    var best_choices = bestMaxDuration( {idi: ioi, disc: constants.discounts}, opt.maxDuration );

                    callback(best_choices);

                });
            });
        }

        function bestMaxDuration( data, maxDuration ){
            var best_choices = [];

            data.idi.forEach(function ( idi, index ) {
                var tmp_best_choices = [],
                    day = idi.interval.split('T')[0],
                    init_bound = idi.interval.split('/')[0].split('T')[1];

                //calcolo maxDuration possibilità a partire da idi corrente
                for ( var i = 0; i < maxDuration; i++ ){

                    //se non sono arrivata alla fine dell'array
                    if( index + i +1 <= data.idi.length ){

                        var tmp_day = data.idi[index + i].interval.split('T')[0],
                            tmp_p = data.idi[index + i].price * data.idi[index + i].weight,
                            final_bound = data.idi[index + i].interval.split('T')[2];

                        //se la data del primo intervallo e dell'ultimo coincidono procedo
                        if( moment(tmp_day).diff(moment(day)) === 0 ){

                            //calcolo l'intervallo di sconto
                            var tmp_discount = setDiscount(data.disc, i);

                            tmp_best_choices.push({
                                day: day,
                                i_bound: init_bound,
                                f_bound: final_bound,
                                range: init_bound +'/'+final_bound,
                                //i_price: tmp_p,
                                f_price: tmp_p * tmp_discount//,
                                //discount: tmp_discount
                            });
                        }
                    }
                }

                //tengo l'intervallo migliore del gruppo
                var tmp_bp = tmp_best_choices[0];
                tmp_best_choices.filter(function( range ){
                    if ( range.f_price <= tmp_bp.f_price ) {
                        tmp_bp = range;
                    }
                });

                best_choices.push(tmp_bp);
            });

            //ordino l'array in base al prezzo finale
            best_choices.sort(function(a, b) {
                return parseFloat(a.f_price) - parseFloat(b.f_price);
            });

            return best_choices;
        }

        function setDiscount( discounts, intervalNumber ){
            var tmp_discount = null;

            discounts.forEach( function( disc ){
                var bound_left = disc.range.split('/')[0] <= intervalNumber,
                    bound_right = disc.range.split('/')[1] === '' ? true : intervalNumber < disc.range.split('/')[1];

                if (bound_left && bound_right) {
                    tmp_discount = disc.discount;
                }
            });

            return tmp_discount === null ? 1 : tmp_discount;
        }

    });