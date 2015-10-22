define(['moment',
        '../../milkman/Utils/constants',
        '../../milkman/Private/checkDayAvailability'],

    function( moment, constants, checkDayAvailability ) {
        'use strict';

        /**
         * verifico che l'intervallo passato come argomento della funzione
         * sia incluso nelle quotazioni in mio possesso. ritorno le quotazioni di interesse
         *
         *  @PARAM: String in the form of 'yyyy-mm-dd'
         *  @PARAM: Function
         *
         */

        return function rangeNormalization( opt, callback ) {
            var merchant = JSON.parse(window.localStorage.getItem( constants.MERCHANT )),
                bh_int = merchant.bhInterval.split('/'),
                merchant_weekdays = [
                    merchant.availMon,
                    merchant.availTue,
                    merchant.availWed,
                    merchant.availThu,
                    merchant.availFri,
                    merchant.availSat,
                    merchant.availSun
                ],
                ranges, norma = [], weekdays, hours;

            //definisco i giorni utili della settimana
            weekdays = getWeekDays( opt.weekdays, merchant_weekdays );

            //range must be an array
            ranges = Array.isArray(opt.ranges) ? opt.ranges : [opt.ranges];

            //console.log('ranges: '+opt.ranges);
            ranges.forEach( function( range ){

                //get left and right side
                range = range.split('/');

                // console.log('rangeNormalization: '+JSON.stringify(range));

                var diffDays = range[1] === undefined ? 0 :
                moment( range[0] ).isValid() && moment( range[1] ).diff(moment( range[0] ), 'days');

                var isDate = moment( range[0] ).isValid() && moment( range[1] ).isValid();

                if( isDate ){
                    var newInts;

                    //split del range in ingresso nei sotto range di interesse
                    for( var i = 0; i <= diffDays; i++ ){
                        var dayToCheck = moment(range[0]).add(i, 'days');

                        if( weekdays[ moment(dayToCheck).format('E') - 1 ] ){
                            console.log('dayToCheck: '+dayToCheck.format('YYYY-MM-DD'));

                            newInts = setintervals(
                                dayToCheck.format('YYYY-MM-DD'),
                                opt.hours ? opt.hours : null,
                                range,
                                bh_int[0],
                                bh_int[1] );

                            //console.log('newInts: '+JSON.stringify(newInts));
                            if( newInts ){
                                newInts.forEach( function( newInt ){
                                    norma.push( newInt );
                                });
                            }
                        }
                    }

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

            //se l'utente ha definito i giorni di interesse verifico che siano consistenti
            // ( se sono inclusi nei giorni di consegna del merchant ) in caso contrario ritorno
            // i giorni specificati dal merchant
            function getWeekDays( weekdays, merchant_weekdays ) {
                var tmp_weekdays = [false, false, false, false, false, false, false];

                if( weekdays ){
                    weekdays.forEach(function ( ind ){
                        if(merchant_weekdays[ ind - 1 ]){
                            tmp_weekdays[ind - 1] = true;
                        }
                    });
                } else {
                    tmp_weekdays = merchant_weekdays;
                }
                return tmp_weekdays;
            }


            //genero i range normalizzati
            function setintervals( day, hours, range, bh_left_time, bh_right_time ){
                var tmp_final_ranges = [];

                if( hours !== null ){   // prendo il day e gli associo le vari fascie orarie
                    hours.forEach(function( rangetime ){
                        tmp_final_ranges.push(
                            day + 'T' + rangetime.split('/')[0]
                            + '/' +
                            day + 'T' + rangetime.split('/')[1]
                        );
                    });
                } else if ( range[0].split('T')[1] ){  //verifico che T initial >= bh_left e che T final <= bh_right
                    tmp_final_ranges.push(
                        day + 'T' + range[0].split('T')[1]
                        + '/' +
                        day + 'T' + range[1].split('T')[1]
                    );

                } else {   // prendo range[0] se non ha un T creo l'itervallo con bh_left e bh_right
                    tmp_final_ranges.push(
                        day + 'T' + bh_left_time
                        + '/' +
                        day + 'T' + bh_right_time
                    );
                }

                return tmp_final_ranges;
            }

        }
    }
);