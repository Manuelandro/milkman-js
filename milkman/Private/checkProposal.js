define(['moment',
        "../../milkman/Utils/constants",
        "../../milkman/Utils/defaults"],
    function(moment, constants, defaults_data) {
        'use strict';

        /**
         *
         *  @PARAM: String in the form of 'yyyy-mm-dd'
         *  @PARAM: Function
         *
         */
        return function checkProposal( proposal, price, callback ) {

            var final_proposal = constants.proposals.filter( function( value ){

                //verifico che il prezzo sia uguale
                if ( value.price === price ){

                    console.log('checkProposal: entered '+value.range );
                    var allTrue = value.range.filter( function( y ){
                        console.log('checkProposal: entered ');
                        //console.log('y: ' + y);//JSON.stringify(y));
                        var oneTrue = proposal.filter( function( i ){
                            console.log('checkProposal: entered ');
                            //console.log('i: ' +i);
                            if (y === i ){
                                //console.log('y === i');
                                return true;
                            }
                        });

                        if( oneTrue.length != 0 ){
                            //console.log(' oneTrue.length != 0');
                            return true;
                        }
                    });

                    if(allTrue.length === proposal.length){
                        //console.log('allTrue.length === proposal.length');
                        return true;
                    }
                }
            });

            //console.log('final_proposal: '+final_proposal.length);

            if( final_proposal.length != 0 ){
               // console.log('check: '+ true);
                callback({ success: true });
            } else {
               // console.log('check: '+ false);
                callback({ success: false });
            }

        }
    }
);