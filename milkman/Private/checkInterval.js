define(['moment'],

    function( moment ) {
        'use strict';

        /**
         * verifico che l'intervallo passato come argomento della funzione
         * sia incluso nelle quotazioni in mio possesso. ritorno le quotazioni di interesse
         *
         *  @PARAM: String in the form of 'yyyy-mm-dd'
         *  @PARAM: Function
         *
         */

        return function checkInterval( ranges, intervals, callback ) {

            var ioi = intervals.filter(function( data ){
                //ora e data di inizio/fine per ogni singolo intervallo
                var i_time_s = data.interval.split('/')[0],
                    i_time_e = data.interval.split('/')[1];

                var moreThanOne = ranges.filter(function( range ){
                    //ora di inizio/fine del range di interesse
                    var r_time_s = range.split('/')[0],
                        r_time_e = range.split('/')[1];

                    //verifica che l'intervallo sia contenuto nel range di interesse
                    if( moment(i_time_s).diff(moment(r_time_s)) >= 0 &&
                        moment(r_time_e).diff(moment(i_time_e)) >= 0){
                        return true
                    }
                });

                if( moreThanOne.length ){
                    return true;
                }
            });

            callback( ioi );

        };
    }
);







