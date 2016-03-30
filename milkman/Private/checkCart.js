define([ 'moment' ], function( moment ) {
    'use strict';

    /**
     * if all parcels's cart have all the required fields it returns the cart,
     * otherwise it returns null
     *
     *  @PARAM: Array
     */

    return function checkCart( parcels, callback ) {
        //console.log('parcels: '+parcels);
        var res = parcels.filter( function( parcel ){
            var isDate = moment( parcel.firstAvailableDay ).isValid() && parcel.firstAvailableDay;

            if(
                //isNumber( parcel.weight ) &&
                isDate &&
                //isNumber( parcel.value ) &&
                ( parcel.pickUp.hubId ||
                  parcel.pickUp.address ||
                  parcel.pickUp.lat && parcel.pickUp.lng )
            ){
                return true
            }
        });

        callback( res );

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    }
});