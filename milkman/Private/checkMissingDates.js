define(['moment',
        "../../milkman/Utils/constants",
        "../../milkman/Private/checkDayAvailability"],

    function(moment, constants, checkDayAvailability) {
        'use strict';

        /**
         * get all the local intervals and find the missing once
         *
         */
        return function checkMissingDates( ranges, callback ) {
            /**
             * IF: ho qualche dato in memoria controllo di avere tutti gli intervalli di interesse
             */

            if ( constants.intervals.length ){
                var arr = [];

                console.log('ranges: '+ranges);
                ranges.forEach(function (range) {
                    var day_one = range.split('T')[0],
                        range_days = moment(range.split('/')[1].split('T')[0]).diff(moment(day_one), 'days');

                    /** per tutti i giorni compresi nel range di interesse verifico se */
                    for (var i = 0; i <= range_days; i++) {
                        var isBound = false;
                        var dayToCheck = null;
                        dayToCheck = moment(day_one).add(i, 'days');

                        /** se torna almeno un valore allora la data è in nostro possesso */
                        constants.intervals.forEach(function (row, index) {

                            var start = moment(row.interval.split('T')[0]),
                                diff = start.diff(dayToCheck);

                            if (diff === 0 ) {
                                isBound = true;
                            }

                            if (!isBound && index + 1 === constants.intervals.length) {
                                /** verifico che il giorno non sia uno di quelli disabilitati */
                                if( checkDayAvailability(dayToCheck) ){
                                    arr.push(dayToCheck.format('YYYY-MM-DD') + '/' + dayToCheck.format('YYYY-MM-DD'));
                                }
                            }
                        });
                    }
                });

                callback( arr );

                /** ELSE: ritorno tutto il range di interesse */
            } else {
                callback( ranges );
            }
        };
    }
);

