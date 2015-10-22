define([
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Utils/constants',
        '../../milkman/Private/checkMissingDates',
        '../../milkman/Private/quotation',
        '../../milkman/Private/getAllProposals',
        '../../milkman/Private/setPrice',
        '../../milkman/Private/choosedProposals'],

    function(
        makeUrlServer,
        constants,
        checkMissingDates,
        quotation,
        getAllProposals,
        setPrice,
        choosedProposals ) {
        'use strict';

        /**
         *
         *  @PARAM:
         *  @PARAM:
         *
         */

        return function quoteEngine( type, opt, callback ) {
            //console.log('quoteEngine: '+JSON.stringify(opt.ranges));
            checkMissingDates( opt.ranges, function( missings ){
                //se ci sono intervalli mancanti faccio una quotation al sever
                //e filtro tutti gli intervalli per trovare quelli di interesse
                quotation(opt.ranges, missings, function( ioi ){

                    if( type === 'findQuote' ){
                        /**
                         *  ritorna un array ordinato con i possibili eventi e i prezzi associati
                         */
                        var sorted_choices = getAllProposals({
                            idi: ioi, disc: constants.discounts},
                            opt.maxDuration,
                            opt.minDuration );
                        //sorted_choices.forEach(function(res){console.log(res.day+'   '+res.range+'  '+res.f_price);});

                        /**
                         *  restituisce le proposte finali per l'utente
                         */
                        var result = [],
                            tmp_results = choosedProposals(sorted_choices, opt.quoteNumber, opt.quotePerDate, opt.overlap, opt.distribution);

                        tmp_results.forEach(function( res ){
                            result.push({
                                range: res.day + 'T' + res.range.split('/')[0] + '/' + res.day + 'T' + res.range.split('/')[1],
                                price: res.f_price
                            });

                        });

                        callback({ success: true, text: 'OK, success.', quotes: result });
                    } else {
                        /**
                         *  calcolo il prezzo con sconto
                         */
                        setPrice( opt.ranges, ioi, callback);
                    }
                });
            });
        };
    }
);