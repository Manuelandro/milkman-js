if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'milkman': '../../milkman',
            'default_data': '../../milkman/Utils/defaults'
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
        define(['../../dist/milkman', 'default_data', 'jquery'], factory);

    } else {
        // Browser globals
        factory(root.milkman, root.default_data, root.jquery);
    }
}(this, function (milkman, default_data, $) {
    'use strict';

    milkman.commit( function( result_1 ) {
        test('not commit test', function() {
            equal(result_1.success, false, 'Commit with failure, no session_id, no redirect_uri expected result: '+ result_1.text);
        });
    });

    window.localStorage.setItem( 'session_token', default_data.SESSION_TOKEN);
    window.localStorage.setItem( 'redirect_uri', default_data.REDIRECT_URI);

    milkman.commit( function( result_1 ) {
        test('commit test', function() {
            equal(result_1.success, false, 'Commit with success. ');
        });
    });
}));


