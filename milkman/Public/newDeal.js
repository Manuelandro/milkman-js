define(['moment',
        '../../milkman/Private/makeUrlServer',
        '../../milkman/Private/request',
        '../../milkman/Utils/constants',
        '../../milkman/Private/checkInterval',
        '../../milkman/Private/priceEngine' ],
    function ( moment, makeUrlServer, request, constants, check_interval, price_engine ) {
        'use strict';

        /**
         *  Creation of a new event; the event have to start and ended in the same day.
         *  If range already exists in local storage, function evaluate price.
         *  Otherwise it calls server and get quotes.
         *
         *  @PARAM: String
         *  @PARAM: Function
         *
         *  @RETURN: event
         */
        return function newDeal( ranges, callback ) {

            //check ranges is an array
            if ( Array.isArray( ranges ) ) {

                //lista dei range che non ho
                var notBounded = ranges.filter( function( range ){
                    var array_date = [];

                    range.split('/').forEach(function( value ){
                        array_date.push(value.split('T')[0]);
                    });

                    //check "from" is the same of "to", otherwise "ERROR 400"
                    if( array_date[0] === array_date[1] ) {
                        var intervals = JSON.parse( window.localStorage.getItem( constants.INTERVAL_OF_INTEREST ) );

                        //se torna almeno un valore allora la data è in nostro possesso
                        var isBounded = intervals.filter( function( interval ){
                            var start = moment(interval.split('/')[0]),
                                end = moment(interval.split('/')[1]),
                                first_bound = moment( array_date[0] ).diff( start ),
                                last_bound = end.diff( moment( array_date[0] ) );

                            if(first_bound >= 0 && last_bound >= 0 ){
                                return true;
                            }
                        });

                        //IF: non è in mio possesso
                        if( !isBounded.length ){
                            return range;
                        }
                    } else {
                        callback({
                            success: false,
                            text: constants.ERROR.BAD_REQUEST_400,
                            message: 'the start dates and the end must be the same.'
                        });
                    }
                });

                //IF: ci sono range sconosciuti trovo i nuovi intervalli
                //ELSE: filtro gli intervalli e trovo quelli di interesse
                if( notBounded.length ){

                    var url = makeUrlServer( '/quotation' );

                    request( url, 'POST', {
                        intervals: notBounded,
                        sessionId: window.localStorage.getItem( constants.SESSION_TOKEN),
                        publishableKey: window.localStorage.getItem( constants.PUBLISHABLE_KEY)
                    }, function( result ) {
                        getPrice( ranges, result.data.intervals, callback );
                    });


                } else {
                    getPrice( ranges, constants.data.intervals, callback );
                }

            } else {
                callback({
                    success: false,
                    text: constants.ERROR.BAD_REQUEST_400,
                    message: 'first argument is not in the correct form.'
                });
            }
        };

        /**
         *  filter the intervals and find the best price
         *
         */
        function getPrice( ranges, intervals, callback){
            check_interval( ranges, intervals, function( intervals_of_interest ){

                intervals_of_interest.length ?

                /**
                 *  sceglie finestra meno costosa e scontarla in base al numero di tw selezionate
                 *
                 *  @RETURN: price
                 */

                    price_engine( ranges, intervals_of_interest, function( deal ) {
                        callback({
                            success: true,
                            text: constants.SUCCESS.OK_200,
                            id: deal.id,
                            price: deal.price
                        });
                    }) :

                    callback({
                        success: false,
                        text: constants.ERROR.NO_RESULTS_402
                    });
            });
        }


    });
