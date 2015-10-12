if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'milkman': '../milkman'
        }
    });

    //Override if in "dist" mode
    if (location.href.indexOf('-dist') !== -1) {
        //Set location of milkman to the dist location
        require.config({
            paths: {
                'milkman': '../dist/milkman'
            }
        });
    }
}

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['../../lib/moment', 'milkman', '../../lib/jquery'], factory);

    } else {
        // Browser globals
        factory(root.moment, root.milkman, root.default_data, root.jquery);
    }
}(this, function (moment, milkman, $) {
    'use strict';

    var new_interval_0 = "2015-09-07T09:30:00.000Z/2015-09-07T10:00:00.000Z",
        new_interval_1 = ["2015-09-08T09:30:00.000Z/2015-09-08T10:00:00.000Z"],    // one interval
        new_interval_2 = [ "2015-09-07T09:30:00.000Z/2015-09-07T11:00:00.000Z"     // three intervals
        ],
        new_interval_3 = [ "2015-09-07T09:30:00.000Z/2015-09-07T10:00:00.000Z",    // different days
            "2015-09-14T09:30:00.000Z/2015-09-14T15:30:00.000Z"
        ],
        new_interval_4 = [ "2015-09-07T09:30:00.000Z/2015-09-07T10:00:00.000Z",     // with quotation
            "2015-09-14T09:30:00.000Z/2015-09-14T15:30:00.000Z",
            "2015-09-15T09:30:00.000Z/2015-09-15T10:00:00.000Z",
            "2015-10-19T11:30:00.000Z/2015-10-19T17:00:00.000Z"
        ];
    var price = 0;
    //AUTH
    milkman.authenticate( milkman.defaults.SETTINGS_3, function() {

        milkman.newDeal( new_interval_1, function( result1 ){

            if( result1.success ){
                //CONFERMA EVENTO
                milkman.confirm(result1.id, function( val ){
                    console.log('confirm test' + val.success );
                });

                test('newDeal: one interval test', function() {
                    equal(result1.success, true, result1.text +
                        ' deal_id: '+result1.id +' price: '+result1.price);
                });
            } else {
                test('newDeal: one interval test', function() {
                    equal(result1.success, false, result1.text );
                });
            }

        });

        //milkman.newDeal( new_interval_2, function( result2 ){
        ////CONFERMA EVENTO
        //    milkman.confirm(result2.id, function( val ){
        //        console.log('confirm test' + val.success );
        //    });
        //
        //    test('newDeal: three intervals test', function() {
        //        equal(result2.success, true, result2.text+
        //            ' deal_id: '+result2.id +' price: '+result2.price);
        //    });
        //});
        //
        //milkman.newDeal( new_interval_3, function( result3 ){
        ////CONFERMA EVENTO
        //    milkman.confirm(result3.id, function( val ){
        //        console.log('confirm test' + val.success );
        //    });
        //
        //    test('newDeal: different days test', function() {
        //        equal(result3.success, true, result3.text+
        //            ' deal_id: '+result3.id +' price: '+result3.price);
        //    });
        //});
        //
        ////with quotation
        //milkman.newDeal( new_interval_4, function( result4 ){
        //
        ////CONFERMA EVENTO
        //    milkman.confirm(result4.id, function( val ){
        //        console.log('confirm test' + val.success );
        //    });
        //
        //    test('newDeal: with quotation test', function() {
        //        equal(result4.success, true, result4.text+
        //            ' deal_id: '+result4.id +' price: '+result4.price);
        //    });
        //});



    });
}));