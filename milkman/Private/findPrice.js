define([
        '../../milkman/Private/priceEngine',
        '../../milkman/Utils/constants'],

    function( price_engine, constants ) {
        'use strict';

        /**
         *
         *  @PARAM:
         *  @PARAM:
         *
         */

        return function findPrice( options, intervals_of_interest, callback ) {

            if( intervals_of_interest.length ){
                //funzione per il calcolo del prezzo e dell intervallo migliore.
                //ciclo su tutti i ipossibili intervalli mettendoli a confronto.
                //in questa analisi tengo conto anche del numero di eventi che possono esserc
                //per giorno, della dimensione massima degli ntervalli e del numero di intervalli che devo
                //cercare



            } else {
                callback({
                    success: false,
                    text: constants.ERROR.NO_RESULTS_402
                });
            }
        };
    }
);