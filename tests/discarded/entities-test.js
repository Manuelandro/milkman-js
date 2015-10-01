

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

    var entity = 'depot',
        data1 = milkman.defaults.DEPOT_1,
        data2 = milkman.defaults.DEPOT_2;


    //CREO UNA NUOVA ENTITà
    milkman.createEntity(entity, data1, function( result_1 ) {
        var new_depot = result_1.data.depot;
        //result_1.success ?
        //    console.log('SUCCESS 1 - created depot: ' + new_depot.depotId) :
        //    console.log('ERROR: ' + result_1.text);

        test('createEntity test', function() {
            equal(result_1.success, true, 'Create Entity with success, expected result: success === true');
        });

        //SETTO ALTRI VALORI NELL'ENTITà CREATA
        milkman.setEntity(entity, new_depot.depotId, data2, function( result_2 ) {
            var mod_depot = result_2.data.depot;
            //    result_2.success ?
            //        console.log('SUCCESS 2 - set depot: ' + mod_depot.depotId) :
            //        console.log('ERROR: ' + result_2.text);

            test('setEntity test', function() {
                equal(result_2.success, true, 'Change value of new entity, expected result: success === true');
            });

            //PRENDO TUTTE LE ENTITà DI TIPO ...
            milkman.getEntities(entity, null, function( result_3a ) {
                test('getEntities "ALL" test', function( ){
                    equal(result_3a.success, true, 'get all values of type "depot", expected result: success === true');
                });
            });

            //PRENDO LA SIGNOLA ENTITà CREATA
            milkman.getEntities(entity, mod_depot.depotId, function( result_3b ) {
                var get_depot = result_3b.data.depot;

                test('getEntities test', function( ){
                    equal(result_3b.success, true, 'get entity by id, expected result: success === true');
                });

                //CANCELLO L'ELTITà CREATA
                milkman.deleteEntity(entity, get_depot.depotId, function( result_4 ) {

                    test('deleteEntity test', function( ){
                        equal(result_4.success, true, 'delete entity by id, expected result: success === true');
                    });
                });
            });
        });
    });
}));
