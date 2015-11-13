define(['moment',
        '../../milkman/Utils/constants'//,
        //'../../milkman/Private/checkDayAvailability'
    ], function( moment, constants ) {
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
            var hub = JSON.parse(window.localStorage.getItem( constants.HUB )),
                merchant = JSON.parse(window.localStorage.getItem( constants.MERCHANT )),

                bh_int = hub.bhInterval.split('/'),
                hub_holidays = hub.holidays,
                hub_localHolidays = hub.localHolidays,
                hub_weekdays = [
                    hub.availMon, hub.availTue, hub.availWed,
                    hub.availThu, hub.availFri, hub.availSat, hub.availSun
                ],
                ranges, tmp_ranges, norma = [], weekdays;

            /** definisco i giorni utili della settimana */
            weekdays = getWeekDays( opt.weekdays, hub_weekdays );

            /** range must be an array */
            tmp_ranges = Array.isArray(opt.ranges) ? opt.ranges : [opt.ranges];

            /** verificare che i range siano adattati agli scaglioni degli 'interval'
             * ( 10 min ) nel caso normalizzarli er difetto
             * verficiare che la dimensione minima del range sia rispettata
             * */
            ranges = checksRangeDimension( tmp_ranges, merchant.atomicIntervalDimension, merchant.minDuration );

            /** verifico che ci sia almeno un range valido */
            if( ranges.length ){
                ranges.forEach( function( range ){

                    /** get left and right side */
                    range = range.split('/');

                    var diffDays = range[1] === undefined ? 0 :
                    moment( range[0] ).isValid() && moment( range[1] ).diff(moment( range[0] ), 'days');

                    var isDate = moment( range[0] ).isValid() && moment( range[1] ).isValid();

                    if( isDate ){
                        var newInts;

                        /** split del range in ingresso nei sotto range di interesse */
                        for( var i = 0; i <= diffDays; i++ ){
                            var dayToCheck = moment(range[0]).add(i, 'days');

                            /** se è uno dei giorni della settimana accettabili*/
                            if( weekdays[ moment(dayToCheck).format('E') - 1 ] ){
                                //console.log('dayToCheck: '+dayToCheck.format('YYYY-MM-DD'));

                                var isHoliday = checkHoliday(dayToCheck.format('YYYY-MM-DD'), hub_holidays),
                                    isLocalHoliday = checkHoliday(dayToCheck.format('YYYY-MM-DD'), hub_localHolidays);

                                /** verifico che il giorno in esame non sia ne 'holiday' ne 'localHoliday' */
                                if( !isHoliday && !isLocalHoliday ){
                                    /** dati i giorni 'YYYY-MM-DD' li setto con intervalli di tempo */
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
                        }
                    } else {
                        callback({
                            success: false,
                            text: constants.STATUS.FAILURE.RANGE_NOT_CORRECT
                        });
                    }
                });

                callback({
                    success: true,
                    ranges: norma
                });
            }
            /** se non cè nessun range valido genero errore*/
            else {
                callback({
                    success: false,
                    text: constants.STATUS.FAILURE.RANGE_NOT_VALID
                });
            }

            /**
             * normalizzo i ranges in ingresso
             * verifico gli orari siano conformi al nostro formato
             * in caso contrario li normalizzo e controllo che abbiano un range temporale minimo
             *
             * @param ranges
             * @param interval
             * @param minimumRangeDim
             * @returns {Array}
             */
            function checksRangeDimension( ranges, interval, minimumRangeDim ){
                var res = [];

                ranges.forEach( function( range ){
                    /** recupero time */
                    var r_left = range.split('/')[0] ? range.split('/')[0].split('T')[1] : null,
                        r_right = range.split('/')[1] ? range.split('/')[1].split('T')[1] : null,
                        cond1 = r_left !== undefined && r_left !== null,
                        cond2 = r_right !== undefined && r_right !== null;

                    /** prendo in considerazione per il check solo quelli con time,
                     * gli altri li salvo automaticamente */
                    if( cond1 && cond2 ) {

                        /** approssimazione per difetto delle date */
                        var time = approximateByMinimum( r_left, r_right, interval );

                        //console.log('ORI: '+r_left +' - '+r_right);
                        //console.log('RES: '+time.left +' - '+time.right);

                        /** verifica che il range ottenuto sia consistente rispetto
                         * al vincolo "minimo range avvettabile"*/
                        var restrictionPassed = checkRestriction( range, time, minimumRangeDim * interval );

                        /** se il vincolo è rispettato salvo il range */
                        if( restrictionPassed.success ){
                            res.push( restrictionPassed.range );
                        }

                    } else {
                        res.push(range);
                    }
                });

                return res;
            }

            /**
             * verifica che il range ottenuto sia consistente rispetto
             * al vincolo "minimo range avvettabile"
             *
             * @param range
             * @param time
             * @param minimumRangeDim
             * @returns {{success: boolean, range: string}}
             */
            function checkRestriction( range, time, minimumRangeDim ){
                var leftDate = range.split('/')[0].split('T')[0] + 'T' + time.left,
                    rightDate = range.split('/')[1].split('T')[0] + 'T' + time.right,

                    diffDates = moment(rightDate).diff(moment(leftDate), 'minutes');

                var bool = minimumRangeDim <= diffDates,
                    tmp_range = leftDate + '/' + rightDate;

                return {success: bool, range: tmp_range}
            }

            /**
             * approssimazione per difetto degli intervalli di tempo rispetto all'interval' implementato per
             * questo merchant
             *
             * @param r_left
             * @param r_right
             * @param interval
             * @returns {{left: *, right: *}}
             */
            function approximateByMinimum( r_left, r_right, interval ){
                var tmp_left,
                    tmp_right,
                    minute_l = r_left.split(':')[1],
                    minute_r = r_right.split(':')[1];

                /** LEFT BOUND MANAGER
                 * IF l'ultimo valore dei minuti è diverso da zero && siamo sui 50esimi minuti
                 * bisogna arrotondare all'ora successiva */
                if( minute_l.charAt(1) != 0 &&  minute_l.charAt(0) == 5 ){
                    /** aggiungo un ora*/
                    tmp_left = String(Number(r_left.split(':')[0]) + 1);
                    tmp_left = tmp_left.length === 1 ? '0'+ tmp_left +':00' : tmp_left +':00';
                }
                /** IF i minuti non finiscono per 0
                 * bisogna arrotondare per difetto */
                else if( minute_l.charAt(1) != 0 ){
                    minute_l = interval * Math.round( minute_l / interval ) + interval;
                    /** nuovi intervalli di tempo */
                    tmp_left = r_left.split(':')[0] +':'+ minute_l;
                }
                /** ELSE l'intervallo è corretto */
                else {
                    tmp_left = r_left;
                }

                /** RIGHT BOUND MANAGER
                 * IF siamo sugli 00esimi minuti
                 * approssimo a 00 */
                if( minute_r.charAt(0) == 0 ){
                    tmp_right = r_right.split(':')[0] +':00';
                }
                /** IF il'intervallo è sporco
                 * approssimo per difetto */
                else if( minute_r.charAt(1) != 0 ){
                    minute_r = interval * Math.round( minute_r / interval ) - interval;
                    /** nuovi intervalli di tempo */
                    tmp_right = r_right.split(':')[0] +':'+ minute_r;
                }
                /** ELSE l'intervallo è corretto */
                else {
                    tmp_right = r_right;
                }

               return {left: tmp_left, right: tmp_right}
            }

            /**
             * verifico che il giorno passato come primo argomento non sia incluso
             * nella lista passata come secnod argomento
             *
             * @param dayToCheck
             * @param holidays
             * @returns {boolean}
             */
            function checkHoliday( dayToCheck, holidays ){
                var res = holidays.filter( function( holiday ){
                     if( moment(holiday).diff(dayToCheck) === 0 ){
                         return true;
                     }
                });

                return res.length > 0;
            }


            /**
             * se l'utente ha definito i giorni di interesse verifico che siano consistenti
             * ( se sono inclusi nei giorni di consegna del merchant ) in caso contrario ritorno
             * i giorni specificati dal merchant
             *
             * @param weekdays
             * @param hub_weekdays
             * @returns {boolean[]}
             */
            function getWeekDays( weekdays, hub_weekdays ) {
                var tmp_weekdays = [false, false, false, false, false, false, false];

                if( weekdays ){
                    weekdays.forEach(function ( ind ){
                        if(hub_weekdays[ ind - 1 ]){
                            tmp_weekdays[ind - 1] = true;
                        }
                    });
                } else {
                    tmp_weekdays = hub_weekdays;
                }
                return tmp_weekdays;
            }


            /**
             * genero i range normalizzati
             *
             * @param day
             * @param hours
             * @param range
             * @param bh_left_time
             * @param bh_right_time
             * @returns {Array}
             */
            function setintervals( day, hours, range, bh_left_time, bh_right_time ){
                var tmp_final_ranges = [];

                if( hours !== null ){   /** prendo il day e gli associo le vari fascie orarie */
                    hours.forEach(function( rangetime ){
                        tmp_final_ranges.push(
                            day + 'T' + rangetime.split('/')[0]
                            + '/' +
                            day + 'T' + rangetime.split('/')[1]
                        );
                    });
                } else if ( range[0].split('T')[1] ){  /** verifico che T initial >= bh_left e che T final <= bh_right */
                    tmp_final_ranges.push(
                        day + 'T' + range[0].split('T')[1]
                        + '/' +
                        day + 'T' + range[1].split('T')[1]
                    );

                } else {   /** prendo range[0] se non ha un T creo l'itervallo con bh_left e bh_right */
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