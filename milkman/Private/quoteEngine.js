define([
        'moment',
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Utils/constants',
        '../../milkman/Private/checkMissingDates',
        '../../milkman/Private/quotation',
        '../../milkman/Private/getAllProposals',
        '../../milkman/Private/setPrice',
        '../../milkman/Private/choosedProposals'//,
       // '../../milkman/Private/kebana'
    ],

    function(
        moment,
        makeUrlServer,
        constants,
        checkMissingDates,
        quotation,
        getAllProposals,
        setPrice,
        choosedProposals//,
        //kebana
    ) {
        'use strict';

        /**
         *
         *  @PARAM:
         *  @PARAM:
         *
         */

        return function quoteEngine( type, opt, callback ) {
            /**
             * verifico se fra 'opt.ranges' ci sono dei ranges che non ho in locale
             */
            checkMissingDates( opt.ranges, function( missings ){
                /**
                 *  se ci sono intervalli mancanti faccio una quotation al sever
                 *  e filtro tutti gli intervalli per trovare quelli di interesse
                 */

                //console.log('ranges: '+JSON.stringify(opt.ranges));
                quotation(opt.ranges, missings, function( response ){
                    if( response.success ){
                        if( type === 'findQuote' ){
                            /**
                             *  ritorna un array ordinato con i possibili eventi e i prezzi associati
                             */

                            //console.log('find ioi: '+ JSON.stringify(response.ioi));
                            var sorted_choices = getAllProposals(
                                { idi: response.ioi, disc: constants.discounts},
                                opt.maxDuration,
                                opt.minDuration );
                          //sorted_choices.forEach(function(res){console.log(res.day+'   '+res.range+'  '+res.f_price);});

                          // console.log('sorted_choices: '+JSON.stringify(sorted_choices));
                            /**
                             *  restituisce le proposte finali per l'utente
                             */
                            var result = [],
                                tmp_results = choosedProposals(sorted_choices, opt.quoteNumber, opt.quotePerDate, opt.overlap, opt.distribution);

                            if( tmp_results.length ){
                                tmp_results.forEach(function( res ){
                                    result.push({
                                        ranges: [ res.day + 'T' + res.range.split('/')[0] + '/' + res.day + 'T' + res.range.split('/')[1] ],
                                        price: res.f_price
                                    });
                                });

                                callback({
                                    status: 'success',
                                    text: constants.STATUS.SUCCESS.OK_200,
                                    quotes: result });
                            } else {
                                callback({
                                    status: 'failure',
                                    text: constants.STATUS.FAILURE.NO_RESULTS_402});
                            }


                        } else {
                            /**
                             *  calcolo il prezzo con sconto
                             */
                            //console.log('get ioi: '+JSON.stringify( response.ioi[0]));
                            setPrice( opt.ranges, response.ioi[0], callback);
                        }
                    } else {
                        callback({
                            status: 'failure',
                            text: response.text });
                    }

                });
            });
        };
    }
);


//var url = 'http://localhost:9200/milkman/ioi',
//    url_config = 'http://localhost:9200/config/milkman/ioi',
//    config = {
//    "interval": {"type" : "date"},
//    "price":  {"type" : "number"},
//    "weight":  {"type" : "number"},
//    "currency":  {"type" : "string"},
//    "start":  {"type" : "date"},
//    "end":  {"type" : "date"}
//};
//
//kebana( 'POST', url_config, JSON.stringify(config));
//
//ioi.forEach(function( res ){
//    res['start'] = moment(res.interval.split('/')[0]).format("YYYY-MM-DDTHH:mm:ssZ");
//    res['end'] = moment(res.interval.split('/')[1]).format("YYYY-MM-DDTHH:mm:ssZ");
//    kebana('POST', url, JSON.stringify(res));
//});


