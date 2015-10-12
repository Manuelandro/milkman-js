if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'milkman': '../../milkman'
        }
    });

    //Override if in "dist" mode
    if (location.href.indexOf('-dist') !== -1) {
        //Set location of milkman to the dist location
        require.config({
            paths: {
                'milkman': '../../dist/milkman'
            }
        });
    }
}

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['../../dist/milkman', 'jquery'], factory);

    } else {
        // Browser globals
        factory(root.milkman, root.jquery);
    }
}(this, function (milkman, $) {
    'use strict';

    //verifico che se passo range senza [] lo inserisce la funzione
    milkman.setInit( milkman.defaults.SETTINGS_1, function( result, moment ) {

        var r1 = '2015-10-12',
            r2 = '2015-10-12/2015-10-13',
            r3 = '2015-10-12T10:30',
            r4 = '2015-10-12T10:30/2015-10-14T18:30',
            r5 = ['2015-10-12', '2015-10-12/2015-10-13', '2015-10-12T10:30', '2015-10-12T10:30/2015-10-14T18:30'],


            ranges = r5, left_time = '09:00', right_time = '18:00';

        //--------------------------------------------
        var norma=[];

        //range must be an array
        ranges = Array.isArray(ranges) ? ranges : [ranges];

        ranges.forEach( function( range ){

            //get left and right side
            range = range.split('/');

            var isDate = moment( range[0] ).isValid() && moment( range[1] ).isValid();

            if( isDate ){
                //verifico hce ci sia un Time, in caso contrario assegno il Business time start
                var tmp_left = range[0].split('T')[1] ? range[0] : range[0] +'T'+ left_time,
                    tmp_righ;

                // verifico sia stata inserita una data di fine
                if(  range[1] ){
                    tmp_righ =  range[1].split('T')[1] ? range[1] : range[1] +'T'+ right_time;
                    //in caso contrario assegno la stessa data di inizio ( intervallo di un giorno )
                    // con business time di fine
                } else {
                    tmp_righ = range[0].split('T')[0] +'T'+ right_time;
                }

                norma.push(tmp_left + '/' + tmp_righ);

            } else {
                console.log('error: not correct range.');
            }
        });


        console.log( norma );
        //callback( norma );


        //milkman.rangeNormalization(object, '09:00', '18:00', function( res ){
        //
        //    console.log('res: '+res);
        //
        //    test('authenticate test SETTINGS', function() {
        //        equal(true, true, result.text)
        //    });
        //
        //});
    });
}));