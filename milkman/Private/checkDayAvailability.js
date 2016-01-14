define([
        'moment',
        "../../milkman/Utils/constants"
    ],

    function( moment, constants ) {
        'use strict';

        /**
         * verifico che l'intervallo passato come argomento della funzione
         * sia incluso nelle quotazioni in mio possesso. ritorno le quotazioni di interesse
         *
         *  @PARAM: String in the form of 'yyyy-mm-dd'
         *  @PARAM: Function
         *
         */

        return function checkInterval( dayToCheck ) {

            var merchant = JSON.parse(window.localStorage.getItem( constants.MERCHANT )),
                weekAvailability = [
                    merchant.availMon,
                    merchant.availTue,
                    merchant.availWed,
                    merchant.availThu,
                    merchant.availFri,
                    merchant.availSat,
                    merchant.availSun
                ],
                weekday = moment(dayToCheck).format('E');

            return weekAvailability[ weekday - 1 ];
        };
    }
);



