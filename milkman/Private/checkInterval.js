define(['moment',
        "../../milkman/Utils/constants",
        "./request",
        "./recoverData",
        "./makeUrlServer"],

    function(moment, constants, request, recover, makeUrlServer) {
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
                var i_time_s = moment(data.interval.split('/')[0]),
                    i_time_e = moment(data.interval.split('/')[1]);

                var moreThanOne = ranges.filter(function( range ){
                    var r_time_s = moment(range.split('/')[0]),
                        r_time_e = moment(range.split('/')[1]);

                    if( i_time_s.diff(r_time_s) >= 0 && r_time_e.diff(i_time_e) >= 0){
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







