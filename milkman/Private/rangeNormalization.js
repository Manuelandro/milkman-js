define(['moment'],

    function(moment) {
        'use strict';

        /**
         * verifico che l'intervallo passato come argomento della funzione
         * sia incluso nelle quotazioni in mio possesso. ritorno le quotazioni di interesse
         *
         *  @PARAM: String in the form of 'yyyy-mm-dd'
         *  @PARAM: Function
         *
         */

        return function rangeNormalization( ranges, left_time, right_time, callback ) {
            var norma=[];

            //range must be an array
            ranges = Array.isArray(ranges) ? ranges : [ranges];

            ranges.forEach( function( range ){

                //get left and right side
                range = range.split('/');

                var isDate = moment( range[0] ).isValid() && moment( range[1] ).isValid();

                if( isDate ){
                    //verifico hce ci sia un Time, in caso contrario assegno il Business time start
                    var tmp_left = range[0].split('T')[1] ? range[0] : range[0] +'T'+ left_time,
                        tmp_righ;

                    // verifico sia stata inserita una data di fine
                    if(  range[1] ){
                        tmp_righ =  range[1].split('T')[1] ? range[1] : range[1] +'T'+ right_time;
                        //in caso contrario assegno la stessa data di inizio ( intervallo di un giorno )
                        // con business time di fine
                    } else {
                        tmp_righ = range[0].split('T')[0] +'T'+ right_time;
                    }

                    norma.push(tmp_left + '/' + tmp_righ);
                } else {
                    callback({
                        success: false,
                        text: 'Range is not in a correct form. Please check it.'
                    });
                }
            });

            callback({
                success: true,
                ranges: norma
            });
        };
    }
);