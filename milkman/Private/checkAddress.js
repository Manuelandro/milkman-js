define( function( moment, constants ) {
    'use strict';

    /**
     * The Address requires to be acceptable "address" field or both "lat" and "lng" fields
     *
     *  @PARAM: Array
     *
     */

    return function checkAddress( data, callback ) {
        if( data ){
            //se ho le info di lat lng ok!
            //altrimenti faccio una chiamata a google maps per recuperare lat-lng
            if( isNumber(data.lat) && isNumber(data.lng) ){
                callback( data );
            } else {
                new google.maps.Geocoder().geocode( {'address': data.address} , function( results, status ) {
                    if ( status == google.maps.GeocoderStatus.OK )
                    {
                        data.lat = results[0].geometry.location.lat();
                        data.lng = results[0].geometry.location.lng();
                        data.evaluatedLatLng = true;
                    }

                    callback( data );
                }, function( error ){
                    //todo: gestire l'errore alla chiamata a google maps
                    console.log('google error');
                })
            }
        } else {
            callback( data );
        }



        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    }
});
