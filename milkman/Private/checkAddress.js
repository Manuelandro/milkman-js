define(function() {
    'use strict';

    /**
     * The Address requires to be acceptable "address" field or both "lat" and "lng" fields
     *
     *  @PARAM: Array
     *
     */

    return function checkAddress( data, callback ) {
        var res = [], tmp_data = [], manage_error = false;

        if( data ){

            /** divido lat-lng da quelli solo con address */
            data.forEach( function( val, index ){

                /** se ho le info di lat lng ok! */
                if( isNumber(val.lat) && isNumber(val.lng) ){
                    res.push(val);
                } else {
                    tmp_data.push(val);
                }

                if( index + 1 === data.length ){

                    if( tmp_data.length ){
                        /** passo al setaccio tutti quelli senza lat-lng e cerco di ricavarne i dati*/
                        tmp_data.forEach( function( val1, index ){

                            /** faccio una chiamata a google maps per recuperare lat-lng
                             * ATTENZIONE: non posso fare più di 10 chimaate al secondo a google
                             * */
                            googleMaps( val1, function( results ){
                                if( results ){
                                    res.push(results);
                                }
                                if( tmp_data.length === index + 1 ){
                                    callback( res, manage_error );
                                }
                            })
                        });
                    } else {
                        callback( res, manage_error );
                    }
                }
            });

        } else {
            callback( null );
        }


        function googleMaps(val, callback){
            if( val.address ) {
                new google.maps.Geocoder().geocode( {'address': val.address} , function( results, status ) {

                    if ( status == google.maps.GeocoderStatus.OK )
                    {
                        val.lat = results[0].geometry.location.lat();
                        val.lng = results[0].geometry.location.lng();
                        val.evaluatedLatLng = true;
                    } else if( status == google.maps.GeocoderStatus.ZERO_RESULTS ) {
                        manage_error = true;
                    }

                    callback(val);

                }, function( error ){ //todo: gestire l'errore alla chiamata a google maps
                })
            } else {
                callback(null);
            }
        }

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    }
});
