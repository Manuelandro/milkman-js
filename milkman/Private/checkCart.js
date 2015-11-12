define([ 'moment' ], function( moment ) {
    'use strict';

    /**
     * if all parcels's cart have all the required fields it returns the cart,
     * otherwise it returns null
     *
     *  @PARAM: Array
     */

    return function checkCart( cart, callback ) {
        var res = cart.filter( function( parcel ){
            var isDate = moment( parcel.firstAvailableDay ).isValid() && parcel.firstAvailableDay;

            if(
                isNumber( parcel.value ) &&
                isNumber( parcel.auxCost ) &&
                isNumber( parcel.weight ) &&
                isDate &&
                ( parcel.pickUp.id ||
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